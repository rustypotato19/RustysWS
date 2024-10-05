pipeline {
    agent any

    environment {
        NODE_VERSION = '20.14.0'
        WEB_DIR = '/var/www/rustyswebservices'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/rustypotato19/RustysWS.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Directly use system's Node.js
                sh 'node -v' // Check if Node.js is available
                sh 'npm install' // Install dependencies
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Server') {
            steps {
                sh "sudo -S rsync -av --delete ./build/ ${WEB_DIR}/"
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
