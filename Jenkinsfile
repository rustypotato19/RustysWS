pipeline {
    agent any

    environment {
        NODE_VERSION = '20.14.0'  // Adjust based on your version
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
                    def nodeHome = tool name: '20.14.0', type: 'NodeJSInstallation'  // Ensure this matches your NodeJS installation name in Jenkins
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
                sh 'npm install'
            }
        }


        stage('Build React App') {
            steps {
                // Build the React app
                sh 'npm run build'
            }
        }

        stage('Deploy to Server') {
            steps {
                // Copy build files to the server web directory
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
