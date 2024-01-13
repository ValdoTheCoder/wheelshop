# Stop running containers from the specified Compose file
docker-compose down

 # Remove Docker images associated with the specified Compose file
docker-compose down --rmi all --volumes --remove-orphans

# Remove stopped containers (if any) from the specified Compose file
docker-compose rm -f

# Perform a Git pull to fetch the latest changes from the remote repository
git pull

# Run Docker Compose to update your containers
docker-compose up -d

# Optional: Display a message indicating the script has completed
Write-Host "Updates pulled, Docker containers stopped and removed, images removed, and new containers started successfully."

#testing
