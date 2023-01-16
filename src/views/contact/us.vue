<template>
  <div class="contact-us-bg">

    <div class="contact-us-t-bg">
      <div class="contact-us-t">
        <h1>Got questions?</h1>
        <p>Questions, bug reports, feedback — we’re here for it all</p>
      </div>

    </div>

    <div class="contact-us-bg-container">

      <div class="contact-us-container">
        <div class="contact-us-l-container">

          <template v-if="selectedTopicStatus">
            <div class="contact-us-l-item">
              <div class="contact-us-l-label">
                Topic
                <el-button type="primary" link @click="changeTopic()">Change</el-button>
              </div>
              <div class="contact-us-l-content">
                <div class="contact-us-l-tags">
                  <div class="contact-us-l-tag contact-us-l-tag-active">
                    {{ selectedTopicData.name }}
                  </div>
                </div>
              </div>
            </div>

            <div class="contact-us-l-item">
              <div class="contact-us-l-label">Related questions</div>
              <div class="contact-us-l-content">

                <el-collapse accordion>
                  <el-collapse-item v-for="(item,i) in selectedTopicData.related_questions" :key="i" :name="i">
                    <template #title>
                      <span class="topic-related_q_name">{{ item.name }}</span>
                    </template>
                    <div class="topic-related_q_content">
                      {{ item.content }}
                    </div>
                  </el-collapse-item>
                </el-collapse>

              </div>
            </div>

            <div class="contact-us-l-item">
              <div class="contact-us-l-label">Related articles</div>
              <div class="contact-us-l-content">
                <div class="contact-us-l-article" v-for="(item,i) in selectedTopicData.related_articles" :key="i">
                  {{ item.title }}
                </div>
              </div>
            </div>

            <div class="contact-us-l-item">
              <div class="contact-us-l-label">Didn’t find the answer? Let us know how we can help</div>
              <div class="contact-us-l-content">
                <el-form
                    ref="jobForms"
                    :model="helpForm"
                    :rules="helpRules"
                    label-width="120px"
                    label-position="top"
                    class="demo-ruleForm"
                >
                  <el-row :gutter="50">
                    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                      <el-form-item label="Full name">
                        <el-input v-model="helpForm.full_name" placeholder="Your first and last names"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                      <el-form-item label="E-mail">
                        <el-input v-model="helpForm.email" placeholder="Your e-mail address"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                      <el-form-item label="Subject">
                        <el-input v-model="helpForm.subject" placeholder="Short description"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="50">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <el-form-item label="Details">
                        <el-input v-model="helpForm.desc" type="textarea" :rows="6" placeholder="Any information that can help us help you"></el-input>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row :gutter="50">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <el-form-item label="Attach files(optional)">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                            :http-request="fileHttpRequest"
                            :before-upload="beforeFileUpload"
                        >
                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>
                        </el-upload>

                        <div class="account-xll-images">
                          <div class="account-xll-image">
                            <div v-if="fileUrl">
                              <el-image
                                  style="width:100%;"
                                  :src="fileUrl">
                              </el-image>
                            </div>
                            <div class="account-xll-image-mask">
                              <span @click="handleSingleImagePreview(fileUrl)">
                                <el-icon color="#ffffff" :size="45">
                                  <zoom-in/>
                                </el-icon>
                              </span>
                              <span @click="handleFileRemove()">
                                 <el-icon color="#ffffff" :size="45">
                                    <Delete/>
                                 </el-icon>
                              </span>
                            </div>
                          </div>
                        </div>

                        <el-dialog width="50%" v-model="dialogSingleImageVisible" center>
                          <el-image :src="dialogSingleImageUrl"></el-image>
                        </el-dialog>

                      </el-form-item>
                    </el-col>

                  </el-row>

                </el-form>
              </div>
            </div>

            <div class="contact-us-l-item">
              <div class="contact-us-l-label"> </div>
              <div class="contact-us-l-content">
                 <el-button type="primary" round>Send us a message</el-button>
              </div>
            </div>


          </template>
          <template v-else>
            <div class="contact-us-l-item">
              <div class="contact-us-l-label">Choose a topic</div>
              <div class="contact-us-l-content">
                <div class="contact-us-l-tags">
                  <div class="contact-us-l-tag" v-for="(item,i) in topicTagsData" :key="i" @click="selectTopic(item)">
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
            <div class="contact-us-l-item">
              <div class="contact-us-l-label">Something else</div>
              <div class="contact-us-l-content">
                <el-input placeholder='Enter a topic, like "bugs"'></el-input>
              </div>
            </div>
            <div class="contact-us-l-item">
              <div class="contact-us-l-label">Featured articles</div>
              <div class="contact-us-l-content">
                <div class="contact-us-l-article" v-for="(item,i) in featuredArticlesData" :key="i">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </template>

        </div>
        <div class="contact-us-r-container">
          <div class="contact-us-r-label">Have a feedback to share?</div>
          <div class="contact-us-r-content">
            <template v-if="selectedFeedbackStatus">
              <el-button round plain @click="selectedFeedbackStatus = false">Hide </el-button>

              <div class="contact-feedback-form">
                <el-form
                    ref="jobForms"
                    :model="helpForm"
                    :rules="helpRules"
                    label-width="120px"
                    label-position="top"
                    class="demo-ruleForm"
                >
                  <el-row :gutter="50">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <el-form-item label="Full name">
                        <el-input v-model="helpForm.full_name" placeholder="Your first and last names"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <el-form-item label="E-mail">
                        <el-input v-model="helpForm.email" placeholder="Your e-mail address"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <el-form-item label="Subject">
                        <el-input v-model="helpForm.subject" placeholder="Short description"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="50">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <el-form-item label="Let it all out">
                        <el-input v-model="helpForm.desc" type="textarea" :rows="2" placeholder="Any information that can help us help you"></el-input>
                      </el-form-item>
                    </el-col>

                  </el-row>

                  <el-row :gutter="50">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <el-form-item label="Attach files(optional)">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                            :http-request="fileHttpRequest"
                            :before-upload="beforeFileUpload"
                        >
                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>
                        </el-upload>

                        <div class="account-xll-images">
                          <div class="account-xll-image">
                            <div v-if="fileUrl">
                              <el-image
                                  style="width:100%;"
                                  :src="fileUrl">
                              </el-image>
                            </div>
                            <div class="account-xll-image-mask">
                              <span @click="handleSingleImagePreview(fileUrl)">
                                <el-icon color="#ffffff" :size="45">
                                  <zoom-in/>
                                </el-icon>
                              </span>
                              <span @click="handleFileRemove()">
                                 <el-icon color="#ffffff" :size="45">
                                    <Delete/>
                                 </el-icon>
                              </span>
                            </div>
                          </div>
                        </div>

                        <el-dialog width="50%" v-model="dialogSingleImageVisible" center>
                          <el-image :src="dialogSingleImageUrl"></el-image>
                        </el-dialog>

                      </el-form-item>
                    </el-col>

                  </el-row>

                </el-form>

                <div class="contact-us-submit">
                  <el-button class="contact-us-submit-btn" type="primary" round >
                    Submit
                  </el-button>
                </div>

              </div>

            </template>
            <template v-else>
              <el-button round plain @click="selectedFeedbackStatus = true;">Yes!</el-button>
            </template>


          </div>
        </div>
      </div>

    </div>

    <newFooter></newFooter>
    <xllLoading :show="uploadLoadingStatus" @onCancel="cancelUploadProfile()"></xllLoading>

  </div>
</template>

<script>
import newFooter from "@/layout/components/newFooter";
import {UPLOAD_BY_ALI_OSS, UPLOAD_BY_SERVICE} from "@/api/api";
import ImageCompressor from "compressorjs";

export default {
  name: "us",
  components: {
    newFooter
  },
  data() {
    return {
      selectedFeedbackStatus:false,


      selectedTopicStatus: false,
      selectedTopicId: 0,
      selectedTopicData: {},
      topicTagsData: [
        {
          id: 1,
          name: 'Signing in',
          related_questions: [
            {
              id: 1,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            },
            {
              id: 2,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            },
            {
              id: 3,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            }
          ],
          related_articles: [
            {
              id: 1,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
            },
            {
              id: 2,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing'
            },
            {
              id: 3,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam'
            },
            {
              id: 4,
              title: 'Lorem ipsum dolor sit amet, consetetur'
            },
            {
              id: 5,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor'
            }
          ]
        },
        {
          id: 2,
          name: 'Upgrading',
          related_questions: [
            {
              id: 1,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            },
            {
              id: 2,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            },
            {
              id: 3,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            }
          ],
          related_articles: [
            {
              id: 1,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
            },
            {
              id: 2,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing'
            },
            {
              id: 3,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam'
            },
            {
              id: 4,
              title: 'Lorem ipsum dolor sit amet, consetetur'
            },
            {
              id: 5,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor'
            }
          ]
        },
        {
          id: 3,
          name: 'Billing and plans',
          related_questions: [
            {
              id: 1,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            },
            {
              id: 2,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            },
            {
              id: 3,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            }
          ],
          related_articles: [
            {
              id: 1,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
            },
            {
              id: 2,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing'
            },
            {
              id: 3,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam'
            },
            {
              id: 4,
              title: 'Lorem ipsum dolor sit amet, consetetur'
            },
            {
              id: 5,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor'
            }
          ]
        },
        {
          id: 4,
          name: 'Deals/Events/Ads',
          related_questions: [
            {
              id: 1,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            },
            {
              id: 2,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            },
            {
              id: 3,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            }
          ],
          related_articles: [
            {
              id: 1,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
            },
            {
              id: 2,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing'
            },
            {
              id: 3,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam'
            },
            {
              id: 4,
              title: 'Lorem ipsum dolor sit amet, consetetur'
            },
            {
              id: 5,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor'
            }
          ]
        },
        {
          id: 5,
          name: 'Topic',
          related_questions: [
            {
              id: 1,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            },
            {
              id: 2,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            },
            {
              id: 3,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            }
          ],
          related_articles: [
            {
              id: 1,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
            },
            {
              id: 2,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing'
            },
            {
              id: 3,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam'
            },
            {
              id: 4,
              title: 'Lorem ipsum dolor sit amet, consetetur'
            },
            {
              id: 5,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor'
            }
          ]
        },
        {
          id: 6,
          name: 'Another topic',
          related_questions: [
            {
              id: 1,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            },
            {
              id: 2,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            },
            {
              id: 3,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            }
          ],
          related_articles: [
            {
              id: 1,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
            },
            {
              id: 2,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing'
            },
            {
              id: 3,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam'
            },
            {
              id: 4,
              title: 'Lorem ipsum dolor sit amet, consetetur'
            },
            {
              id: 5,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor'
            }
          ]
        },
        {
          id: 7,
          name: 'Questions about this topic',
          related_questions: [
            {
              id: 1,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            },
            {
              id: 2,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            },
            {
              id: 3,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            }
          ],
          related_articles: [
            {
              id: 1,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
            },
            {
              id: 2,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing'
            },
            {
              id: 3,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam'
            },
            {
              id: 4,
              title: 'Lorem ipsum dolor sit amet, consetetur'
            },
            {
              id: 5,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor'
            }
          ]
        },
        {
          id: 8,
          name: 'Feedback',
          related_questions: [
            {
              id: 1,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            },
            {
              id: 2,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            },
            {
              id: 3,
              name: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
              content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta labore et dolore magna aliquyam erat, sed diamawt voluptua. At vero eos et accusam et justo duodolore s et ea rebum. Stet clita kasd gubergren, no seawrqc takimata sanctus est Lorem ipsum dolor sit ametd. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamadi voluptua. At vero eos et accusam et justo duoagwe dolores et ea rebum. Stet clita kasgubergren, no sea'
            }
          ],
          related_articles: [
            {
              id: 1,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
            },
            {
              id: 2,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing'
            },
            {
              id: 3,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam'
            },
            {
              id: 4,
              title: 'Lorem ipsum dolor sit amet, consetetur'
            },
            {
              id: 5,
              title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor'
            }
          ]
        }

      ],
      featuredArticlesData: [
        {
          title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam'
        },
        {
          title: 'Lorem ipsum dolor sit amet, consetetur sadipscing'
        },
        {
          title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
        }
      ],
      helpForm:{
        name:'',
        email:'',
        subject:'',
        desc:'',
        file:''
      },
      helpRules: {
        email: [
          {
            type:'email',
            required:false,
            message: 'Please input',
            trigger: 'change',
          },
        ]

      },
      uploadActionUrl: process.env.VUE_APP_UPLOAD_ACTION_URL,
      uploadHeaders: {
        platform: 4
      },
      uploadLoadingStatus:false,
      dialogSingleImageVisible:false,
      fileUrl:'',
      dialogSingleImageUrl:''

    }
  },
  mounted() {

  },
  methods: {
    selectTopic(item) {
      this.selectedTopicData = item;
      this.selectedTopicStatus = true;
    },
    changeTopic() {
      this.selectedTopicStatus = false;
      this.selectedTopicData = {}
    },
    fileHttpRequest(options) {
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token', localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.fileUrl = myFileUrl
                self.helpForm.file = myFileUrl
              }
            }).catch(err => {
              console.log(err)
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            UPLOAD_BY_SERVICE(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.fileUrl = myFileUrl
                self.helpForm.file = myFileUrl
              }
            }).catch(err => {
              console.log(err)
            })

          }

        },
        error(err) {
          console.log(err.message)
        }

      })

    },
    beforeFileUpload(file) {
      this.uploadLoadingStatus = true;

      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    cancelUploadProfile() {
      this.uploadLoadingStatus = false;
    },
    handleSingleImagePreview(file) {
      this.dialogSingleImageUrl = file
      this.dialogSingleImageVisible = true;
    },
    handleFileRemove(){
      this.fileUrl = ''
      this.helpForm.file = ''
    },

  }

}
</script>

<style scoped>
.contact-us-bg {
  background-color: #F0F2F5;
  min-height: calc(var(--i-window-height) - 140px);
}

.contact-us-t-bg {
  position: relative;
  height: 280px;
  background-color: #6650b3;

}

.contact-us-t{

  position: absolute;
  background-color:#6650b3 ;
  padding: 55px 55px 55px 200px;

  bottom: -100px;
  top:0;
  left: 0;
  right:0;
}

.contact-us-t h1 {
  font-family: Montserrat Regular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 40px;
  color: #FFFFFF;
}

.contact-us-t p {
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #F0F2F5;
  margin-top: 20px;
}

.contact-us-bg-container {
  z-index: 1;
  position: relative;
}

.contact-us-container {
  margin:0 50px 100px 50px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

.contact-us-l-container {
  width: 800px;
  background-color: #FFFFFF;
  padding: 50px;
  border-radius: 18px;
  box-shadow: 0 0 23px #00000012;
}

.contact-us-l-item {
  margin-bottom: 25px;
}

.contact-us-l-label {
  font-size: 20px;
  font-family: Cabin Medium, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  margin-bottom: 15px;
}

.contact-us-l-content {

}

.contact-us-l-tags {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.contact-us-l-tag {
  font-size: 18px;
  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  padding: 10px 25px;
  border-radius: 25px;
  background-color: #F0F2F5;
  box-shadow: 0px 0px 23px #00000012;
  margin-right: 25px;
  margin-bottom: 25px;
  cursor: pointer;
}

.contact-us-l-tag-active {
  background-color: #6650B3;
  color: #FFFFFF;
}

.contact-us-l-article {
  font-size: 18px;
  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  color: #6650B3;
  margin-bottom: 15px;
  cursor: pointer;
}

.contact-us-r-container {
  background-color: #F0F2F5;
  padding: 50px;
  border-radius: 18px;
  box-shadow: 0 0 23px #00000012;
}

.contact-us-r-label {
  font-size: 28px;
  font-family: "Cabin SemiBold", Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;

}

.contact-us-r-content {
  margin-top: 25px;
}

.topic-related_q_name {
  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
}

.topic-related_q_content {
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
}


.account-xll-images {
  width: 90%;
}

.account-xll-image {
  position: relative;
  margin-top: 10px;

}

.account-xll-image-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: none;

}

.account-xll-image:hover .account-xll-image-mask {
  /*display: inline;*/
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.account-xll-image-mask span {
  margin-right: 15px;
  cursor: pointer;
}

.account-xll-image-mask:hover {

}

.contact-feedback-form{
  max-width: 450px;
  margin-top: 25px;
}

.contact-us-submit{

}

.contact-us-submit-btn{
  width:100%;
}


@media screen and (max-width: 768px) {

  .contact-us-t-bg{
    height: 200px;
  }

  .contact-us-t{
    padding: 25px;
    bottom:0;
  }

  .contact-us-t h1{
    font-size: 32px;
  }
  .contact-us-t p{
    font-size: 18px;
  }

  .contact-us-container{
    margin: 15px;
    flex-direction: column;
  }

  .contact-us-l-container{
    width: auto;
    padding: 15px;
    background-color: unset;
    box-shadow: none;
  }

  .contact-us-l-label{
    font-size: 18px;
    margin-bottom: 15px;
  }

  .contact-us-l-tag{
    font-size: 12px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .contact-us-l-article{
    font-size: 16px;
  }

  .contact-us-r-container{
    padding: 25px;
    width: calc(100% - 50px);
  }

  .contact-us-r-label{
    font-size: 18px;
  }

  /deep/ .el-collapse-item__header{
    background-color: unset;
    line-height: unset;
    border-bottom: 1px solid #6650B3;
  }

  /deep/ .el-collapse-item__wrap{
    background-color: unset;

  }

  .topic-related_q_name{
    font-size: 16px;
  }

  .topic-related_q_content{
    font-size: 14px;
  }

}

@media screen and (min-width: 769px) and (max-width: 991px) {

  .contact-us-bg-container {
    height: calc(var(--i-window-height) - 70px);
  }

  .contact-us-l-container {
    padding: 25px;
    width: 400px;
  }

  .contact-us-r-container {
    padding: 25px;
  }
}

@media screen and (min-width: 992px) and (max-width: 1199px) {
  .contact-us-l-container {
    padding: 25px;
    width: 600px;
  }

  .contact-us-r-container {
    padding: 25px;
  }
}


@media screen and (min-width: 1200px) and (max-width: 1919px) {

}


</style>
