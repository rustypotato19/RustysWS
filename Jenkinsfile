pipeline {
    agent any

    environment {
        NODE_VERSION = 'Node20'  // Ensure this matches your NodeJS installation name in Jenkins
        WEB_DIR = '/var/www/rustyswebservices' // The directory where the build files will go
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/rustypotato19/RustysWS.git'  // Replace with your actual Git repo URL
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    def nodeHome = tool name: 'Node20', type: 'NodeJSInstallation'  // Use the correct NodeJS installation name
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Server') {
            steps {
                sh "rsync -av --delete ./build/ ${WEB_DIR}/"
            }
        }
    }

    post {
        success {
            echo 'Deployment was successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
