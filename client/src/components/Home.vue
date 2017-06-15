<template lang="html">
  <div class="">
    <table border:'2px' v-for="blog in blogs">
      <thead>
        <tr>
          <td>NO</td>
          <td>Blog</td>
          <td>Creator</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{index}}</td>
          <td>{{blog.title}}</td>
          <td>{{blog.creator}}</td>
          <td><button type="button" class="btn btn-danger">Delete</button>|| <button type="button" class="btn btn-primary">Edit</button></td>
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
      isRead: ""
    }
  },
  methods:{
    listBlogs(){
      let self = this;
      axios.get(`http:localhost:3000/list`)
        then(response=>{
          self.blogs = response.data
        })
        .catch(err=>{
          console.log(err);
        })
      }  
  },
  created: function(){
    this.listBlogs()
  },
  computed:{
  }
}
</script>

<style lang="css">
</style>
