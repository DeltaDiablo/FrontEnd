<template>
    <div>
    <form lang="en">
        <h1>Sign Up</h1>
        <label for="username">User Name: </label>
        <input id="username" v-model="username"/><br>
        <label for="email" >Email Address: </label>
        <input id="email" v-model="email"/><br>
        <label for="password">Enter Password: </label>
        <input id="password" type="password" v-model="password"/><br>
        <label for="secondarypassword">Enter Password Again: </label>
        <input id="secondarypassword" type="password" v-model="pw2"/><br>
        <button :disabled="btn" @click.prevent="submit()">Submit</button>
    </form>
    <p>{{ username }}<br>{{ email }}</p>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'SignUpPage',
    data(){
        return{
            password:'',
            pw2:'',
            username:'',
            email:'',

        };
    },
    methods:{
        submit(){
           // const reqBody = {username:this.username,email:this.email,password:this.password};
          axios.post("/api/1.0/users",{username:this.username,email:this.email,password:this.password})
        }
    },
    computed:{
        btn()
        {
            return this.password && this.pw2? this.password!=this.pw2:true;
        }
    }
}
</script>