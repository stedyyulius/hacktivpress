<template lang="html">
  <div>
    <button type="button" @click="add()">Create Blog</button>
      <br><br>
      <h4>Select By Category</h4>
      <a @click="listBlogs()">All ||</a>
      <a @click="listBlogs('horror')"> Horror ||</a>
      <a @click="listBlogs('drama')"> Drama ||</a>
      <a @click="listBlogs('other')">Other</a>
      <br><br>
      <input type="text" placeholder="Search by Author's Name">
      <form v-if="isRead === true">
        <br>
        <button type="button" class="btn btn-danger" @click="cancelRead()">X</button>
        <h1>{{title}}</h1>
        <h3>{{content}}</h3>
      </form>
    <div class="content container" v-if="isAdd == true">
      <form>
        <h1>Title</h1>
        <input type="text" v-model="title">
        <h1>Content</h1>
        <input type="text" v-model="content">
        <br><br>
        <select v-model="category">
          <option>horror</option>
          <option>drama</option>
          <option>other</option>
        </select>
        <br><br>
      <button type="button" @click="createBlog">Create</button>
      </form>
    </div>
    <table border='2px;'>
      <thead>
        <tr>
          <td><b>NO</b></td>
          <td><b>Blog</b></td>
          <td><b>Author</b></td>
          <td><b>Category</b></td>
          <td><b>Actions</b></td>
        </tr>
      </thead>
      <tbody v-for="(blog,index) in blogs">
        <tr>
          <td>{{index +1}}</td>
          <td><a href="#" @click="read(blog._id)">{{blog.title}}</a></td>
          <td>{{blog.creator}}</td>
          <td>{{blog.category}}</td>
          <td><button type="button" class="btn btn-danger" v-if="blog.user_id === user._id" @click="confirmDel(blog._id,index)">Delete</button>|| <button type="button" class="btn btn-primary" v-if="blog.user_id === user._id" @click="edit(blog._id)">Edit</button></td>
        </tr>
      </tbody>    
    </table>
  </div>
</template>

<script>

export default {
  data(){
    return{
      blogs:[],
      isRead: "",
      title:"",
      content: "",
      category: "",
      author: "",
      isAdd:false,
      isRead: false
    }
  },
  methods:{
    listBlogs(category){
      let self = this;
      // let category = localStorage.getItem('category')
      if(category){
        axios.get(`http://localhost:3000/blog/${category}`)
        .then(response=>{
          console.log(`masuk`,response.data);
          self.blogs = response.data
        })
        .catch(err=>{
          console.log(err);
        })
      }
      // else if(category !== 'horror' && category !== null && category !== 'drama' && category !== 'other'){
      //   axios.get(`http://localhost:3000/blog/creator/${category}`)
      //   .then(response=>{
      //     self.blogs = response.data
      //   })
      //   .catch(err=>{
      //     console.log(err);
      //   })
      // }
      else{
      axios.get(`http://localhost:3000/list`)
        .then(response=>{
          self.blogs = response.data
        })
        .catch(err=>{
          console.log(err);
        })
      }
    },
      createBlog(){
        let self = this;
        let user = JSON.parse(localStorage.getItem('user'))
        axios.post(`http://localhost:3000/createBlog`,{
          title: self.title,
          content: self.content,
          category: self.category,
          creator: user.name,
          user_id: user._id
        })
        .then(response=>{
          alert(`${self.title} Created!`)
          self.blogs.push(response.data)
          self.isAdd = false
        })
        .catch(err=>{
          console.log(err);
        })
      },
    add(){
      this.isAdd = true
    },
    cancel(){
      this.isAdd = false
    },
    deleteBlog(id,index){
      let self = this;
      axios.delete(`http://localhost:3000/${id}`)
        .then(response=>{
          self.blogs.splice(index,1)
        })
        .catch(err=>{
          console.log(err);
        })
    },
    confirmDel(id,index){
      if(confirm(`Are You Sure You Want To Delete This Blog?`)){
        this.deleteBlog(id,index)
      }
      else{
        return false
      }
    },
    read(id){
      let self = this;
      axios.get(`http://localhost:3000/blog/${id}`)
      .then(response=>{
        self.isRead = true
        self.title = response.data.title
        self.content = response.data.content
      })
    },
    cancelRead(){
      this.isRead = false
      this.title = ""
      this.content = ""
    }
  },
  created: function(){
    this.listBlogs()
  },
  computed:{
    user(){
      let user = JSON.parse(localStorage.getItem('user'))
      if(user){
        return user
      }
    }
  }
}
</script>

<style lang="css">
</style>
