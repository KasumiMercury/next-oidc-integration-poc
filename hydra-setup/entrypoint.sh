#!/bin/sh
set -e

echo "Waiting for Hydra admin API..."
until curl -fs "$HYDRA_ADMIN_URL/health/ready" >/dev/null; do sleep 1; done

body=$(jq -n \
  --arg id "$OIDC_CLIENT_ID" \
  --arg secret "$OIDC_CLIENT_SECRET" \
  --arg redirect "$OIDC_REDIRECT_URI" \
  --arg logout "$OIDC_POST_LOGOUT_REDIRECT_URI" \
  --arg scope "$OIDC_SCOPE" \
  '{
    client_id: $id,
    client_secret: $secret,
    client_name: "front-poc",
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    scope: $scope,
    redirect_uris: [$redirect],
    post_logout_redirect_uris: [$logout],
    token_endpoint_auth_method: "client_secret_post",
    skip_consent: true,
    skip_logout_consent: true
  }')

if curl -fs "$HYDRA_ADMIN_URL/admin/clients/$OIDC_CLIENT_ID" >/dev/null 2>&1; then
    echo "Updating existing client: $OIDC_CLIENT_ID"
    curl -fs -X PUT "$HYDRA_ADMIN_URL/admin/clients/$OIDC_CLIENT_ID" \
        -H 'content-type: application/json' \
        -d "$body" >/dev/null
else
    echo "Creating client: $OIDC_CLIENT_ID"
    curl -fs -X POST "$HYDRA_ADMIN_URL/admin/clients" \
        -H 'content-type: application/json' \
        -d "$body" >/dev/null
fi

echo "Done."
