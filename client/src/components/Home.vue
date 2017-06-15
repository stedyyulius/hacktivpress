<template lang="html">
  <div>
    <button type="button" @click="add()">Create Blog</button>
      <br><br>
      <h4>Select By Category</h4>
      <a @click="listBlogs()">All ||</a>
      <a @click="listBlogs('horror','otong')"> Horror ||</a>
      <a @click="listBlogs('drama','otong')"> Drama ||</a>
      <a @click="listBlogs('other','otong')">Other</a>
      <br><br>
      <input type="text" placeholder="Search by Author's Name" v-model="author">
      <button type="button" @click="listBlogs('otong',author)">Search</button>
      <form v-if="isRead === true">
        <br>
        <button type="button" class="btn btn-danger" @click="cancelRead()">X</button>
        <h1>{{title}}</h1>
        <h3>{{content}}</h3>
      </form>
      <form v-if="isEdit === true">
        <br><br>
        <button type="button" @click="cancelEdit()" class="btn btn-danger">X</button>
        <h1>Edit Blog</h1>
        <h3>Title</h3>
        <input type="text" v-model="title">
        <h3>Content</h3>
        <textarea v-model="content" rows="7" cols="50"></textarea>
        <br><br>
        <select v-model="category">
          <option>horror</option>
          <option>drama</option>
          <option>other</option>
        </select>
        <button type="button" class="btn btn-success" @click="updateBlog(id,i)">Update</button>
      </form>
    <div class="content container" v-if="isAdd == true">
      <form>
        <br><br>
        <button type="button" class="btn btn-danger" @click="cancel()">X</button>
        <h1>Title</h1>
        <input type="text" v-model="title">
        <h1>Content</h1>
        <textarea v-model="content" rows="7" cols="50"></textarea>
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
          <td><button type="button" class="btn btn-danger" v-if="blog.user_id === user._id" @click="confirmDel(blog._id,index)">Delete</button>|| <button type="button" class="btn btn-primary" v-if="blog.user_id === user._id" @click="edit(blog._id,blog.title,blog.content,blog.category,index)">Edit</button></td>
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
      isRead: false,
      isEdit: false,
      id: "",
      i: ""
    }
  },
  methods:{
    listBlogs(category,author){
      let self = this;
      // let category = localStorage.getItem('category')
      if(category !== 'otong' && author === 'otong'){
        axios.get(`http://localhost:3000/blog/cat/${category}`)
        .then(response=>{
          self.blogs = response.data
        })
        .catch(err=>{
          console.log(err);
        })
      }
      if(author !== 'otong' && category === 'otong'){
        axios.get(`http://localhost:3000/blog/creator/${author}`)
        .then(response=>{
          self.blogs = response.data
        })
        .catch(err=>{
          console.log(err);
        })
      }
      else if(!category && !author){
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
      if(localStorage.getItem('user') === null){
        alert(`You Must Login First!`)
      }
      else{
      this.isAdd = true  
      }      
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
    },
    edit(id,title,content,category,i){
      this.isEdit = true
      this.id = id
      this.i = i
      this.title = title
      this.content = content
      this.category = category
    },
    updateBlog(id,index){
      let self = this;
      axios.put(`http://localhost:3000/updateBlog/${id}`,{
        title: self.title,
        content: self.content
      })
      .then(response=>{
        axios.get(`http://localhost:3000/blog/${id}`)
        .then(blog=>{
          alert(`${self.title} updated!`)
          self.isEdit = false
          self.blogs[index] = blog.data
        })
      })
      .catch(err=>{
        console.log(err);
      })
    },
    cancelEdit(){
      this.isEdit = false
      this.id = ""
      this.i = ""
      this.title = ""
      this.content = ""
      this.category = ""
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
      else{
        return ""
      }
    }
  }
}
</script>

<style lang="css">
</style>
