# Note App

This repository contains a containerized React application designed It allows users to track pending tasks, manage completely stateless data via `localStorage`, and visually distinguish overdue notes seamlessly.

## Submission Reference

As per the requirements, this project has been fully Dockerized and deployed:

- **DockerHub Link:** [https://hub.docker.com/r/contantine/note-app](https://hub.docker.com/r/contantine/note-app)


## Running Locally via Docker

To run this application locally without needing Node.js or any local dependencies, simply use Docker.

1. **Pull the Image:**
   ```bash
   docker pull contantine/note-app:latest
   ```

2. **Run the Container:**
   ```bash
   docker run -d -p 8080:80 --name my-cyber-notes contantine/note-app
   ```

3. **View the Application:**
   Open your browser and navigate to: `http://localhost:8080`

## Screenshots

- **Docker/Terminal Screenshot:**
   ![App](public/Screenshot%20From%202026-04-11%2022-13-44.png)
    ![App](public/Screenshot%20From%202026-04-11%2022-14-20.png)
   ![App](public/Screenshot%20From%202026-04-11%2022-14-27.png)
- **App View :**
 ![Terminal](public/Screenshot%20From%202026-04-11%2022-04-33.png)

## EC2 Deployment

- **Live Public URL:** [http://34.206.185.26](http://34.206.185.26)

### Deployment Commands Used
The following commands were executed sequentially inside the AWS EC2 instance terminal (Ubuntu) to pull and execute the containerized application:

```bash
sudo apt update -y
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo docker pull contantine/note-app:latest
sudo docker run -d -p 80:80 --name my-note-app contantine/note-app
```

### EC2 Screenshots

- **EC2 Terminal Deployment:**
  ![EC2 Deploy](public/ec2-deployed/Screenshot%20From%202026-04-11%2022-43-56.png)
  
- **App Live on Public IP:**
  ![Live App](public/ec2-deployed/Screenshot%20From%202026-04-11%2022-44-14.png)
