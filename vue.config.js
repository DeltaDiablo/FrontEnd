module.exports =(
  {
    devServer:
    {
    port: 6080,
    proxy:
    {
      "/api": 
      {
        target: "http://localhost:8080"
      }
    }
  }
})
