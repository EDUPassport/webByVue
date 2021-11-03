<template>
<div class="bg">
  <el-row align="top" justify="center">
    <el-col class="result-banner" :xs="24" :sm="24" :md="24" :lg="24" :xl="24"></el-col>
  </el-row>
  <el-row align="top" justify="center">
    <div class="result-container">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="result-label">
          Showing Search Results for "Coach"
        </div>
        <div class="result-tips">
          5 results found
        </div>

        <div class="result-content-container">
          <div class="content-l">
           <div class="content-item">
             <div class="content-item-title">Giraffe English Coach <span>Tag</span></div>
             <div class="content-item-desc">
               The job Description is a lorem ipsum dol lll The job Description is a lorem ipsum dol lll
               The job Description is a lorem ipsum dol lll The job Description is a lorem ipsum dol lll
             </div>
           </div>
          </div>
          <div class="content-r">
            <div class="content-r-container">
              <div class="content-r-label">Search Site</div>
              <div class="content-r-input">
                <el-input placeholder="Type Search here"></el-input>
              </div>
              <div class="content-r-tips">
                Search through thousands of jobs, Events and Deals. For better
                results,search for keywords that are as unique your desired results
                as possible.
              </div>
              <div class="content-r-tags">
                <div class="content-r-tags-label">Tags</div>
                <div class="content-r-tags-content">
                  Part-Time,Tag2,Equal Opportunity,Tag4,Health,Insurance
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="search-other-container">
          <div class="search-other-label">Find what you were looking for?</div>
          <div class="search-other-btn-container">
            <el-button class="search-other-btn" type="primary">Try ANOTHER SEARCH</el-button>
          </div>
        </div>
      </el-col>
    </div>

  </el-row>
</div>
</template>

<script>
export default {
  name: "result"
}
</script>

<style scoped>
.bg{
  background-color: #f5f6f7;
}
.result-banner{
  height: 120px;
  background-image: url("../../assets/bg/oriental-tiles.png");
  background-repeat: repeat;
  background-size: 20%;
  background-position: center;
}

.result-container{
  width: 1100px;
  margin: 0 auto;
  background-color: #FFFFFF;
  padding: 20px;
}

.result-label{
  font-size: 24px;
  font-weight: bold;
}

.result-tips{
  font-size: 22px;
}

.result-content-container{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
}

.content-l{
    width: 70%;
}

.content-item{
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #EEEEEE;
}
.content-item-title{
  font-size: 16px;
  font-weight: bold;
}
.content-item-desc{
  font-size: 14px;
  padding: 10px 0;
  color: #808080;
}

.content-r{
  width: 30%;
  padding: 20px;
}

.content-r-container{
  background-color: #0AA0A8;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
}

.content-r-label{
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
}

.content-r-input{
  margin-top: 20px;
}

.content-r-tips{
  font-size: 14px;
  color: #FFFFFF;
  margin-top: 40px;
}

.content-r-tags{
  margin-top: 20px;
}

.content-r-tags-label{
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
}

.content-r-tags-content{
  padding: 20px 0;
  font-size: 14px;
}

.search-other-container{
  background-color: #f5f6f7;
  padding: 40px;
  border-radius: 10px;
}
.search-other-label{
  font-size: 16px;
  font-weight: bold;
}
.search-other-btn-container{
  margin-top: 10px;
}
.search-other-btn{
  font-size: 14px;
}
</style>