skaffold dev --no-prune=false --cache-artifacts=false

docker system prune --volumes

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.5.1/deploy/static/provider/cloud/deploy.yaml

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
