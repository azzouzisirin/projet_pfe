pipeline {
    agent any

    stages { 
      stage('Build backend') {
            steps {
                sh """
                cd backend/
                ansible-playbook ansible-playbook.yml
                """
            }
        }
       stage('Build frontend') {
            steps {
                sh """
                cd client/
                ansible-playbook ansible-playbook.yml
                """
            }
        }
        stage('Build meeting') {
            steps {
                sh """
                cd meeting/
                ansible-playbook ansible-playbook.yml
                """
            }
        }
}
}