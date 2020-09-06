import axios from 'axios'

export const register = (newUser) => {

}

export const login = (user) => {
    return axios
        .post('/auth', {
            username: user.username,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data['access_token'])
            return response.data
          })
          .catch(err => {
              if(err.response.status === 401){
                  throw new Error("Username or Password incorrect")
              }
          })
}

export const getBase = () => {
    return axios
    .get('/list', {
         headers: {"Authorization" : `JWT `+ localStorage.getItem('usertoken')} 
        })
        .then(response => {
            return response.data
        }).catch(err => {
            console.log(err)
    })
}

export const getDirectory = (inputDir) => {

    return axios({
        method: 'post',
        url: '/directory',
        data: {
            directory: inputDir
        },
        headers: {
            "Authorization" : `JWT `+ localStorage.getItem('usertoken'),
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        return response.data
    }).catch(err => {
        console.log(err)
    })
}

export const extractFiles = (inputDir) => {
    return axios({
        method: 'post',
        url: '/extract',
        data:{
            directory: inputDir
        },
        headers: {
            "Authorization" : `JWT `+ localStorage.getItem('usertoken'),
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.data        
    }).catch(err => {
        console.log(err)
    })
}