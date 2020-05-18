pipeline {
  agent {
    node {
      label 'racet-test'
    }

  }
  stages {
    stage('scm') {
      steps {
        sh 'npm install '
        sh 'npm run build'
      }
    }

  }
}