<template>
  <div class="input-box" @paste="paste" @keydown="keydown" @keyup="keyup"  @input="inputEvent">

    <input maxlength="1" min="0" max="9" data-index="0" oninput ="value=value.replace(/[^\d]/g,'')" v-model.trim.number="input[0]" ref="firstInput" />
    <input class="input-box-space" disabled data-index="-1" />

    <input maxlength="1" min="0" max="9" data-index="1" oninput ="value=value.replace(/[^\d]/g,'')" v-model.trim.number="input[1]"  />
    <input class="input-box-space" disabled data-index="-1" />

    <input maxlength="1" min="0" max="9" data-index="2" oninput ="value=value.replace(/[^\d]/g,'')" v-model.trim.number="input[2]"  />
    <input class="input-box-space" disabled data-index="-1" />

    <input maxlength="1" min="0" max="9" data-index="3" oninput ="value=value.replace(/[^\d]/g,'')" v-model.trim.number="input[3]"  />
    <input class="input-box-space" disabled data-index="-1" />

    <input maxlength="1" min="0" max="9" data-index="4" oninput ="value=value.replace(/[^\d]/g,'')" v-model.trim.number="input[4]"  />
    <input class="input-box-space" disabled data-index="-1" />

    <input maxlength="1" min="0" max="9" data-index="5" oninput ="value=value.replace(/[^\d]/g,'')" v-model.trim.number="input[5]"  />

  </div>

</template>

<script>
import {ref,onMounted} from 'vue'
export default {
  name: "sixInputVerificationCode",
  setup(props,context){
    const input = ref(['','','','','',''])
    const pasteResult = ref([])

    function inputEvent(e) {

      let index = e.target.dataset.index * 1;
      let el = e.target;
      input.value[index] =  el.value.slice(0,1)
    }

    function keydown(e) {

      let index = e.target.dataset.index * 1;
      let el = e.target;
      if (e.key === 'Backspace') {

        if (input.value[index].length > 0) {
          input.value[index] = ''

        } else {

          if(el.previousElementSibling ){

            if(el.previousElementSibling.dataset.index === '-1'){
              el.previousElementSibling.previousElementSibling.focus()
            }else{
              el.previousElementSibling.focus()
            }

            input.value[index-1] = ''

          }

        }

        context.emit('disabled',true)
        

      } else if (e.key === 'Delete') {

        if (input.value[index].length > 0) {
          input.value[index] = ''
        } else {
          if (el.nextElementSibling) {
            input.value[index = 1] = ''
          }
        }

        if(el.nextElementSibling){
          if( el.nextElementSibling.dataset.index === '-1'){
            el.nextElementSibling.nextElementSibling.focus()
          }else{
            el.nextElementSibling.focus()
          }

        }

        context.emit('disabled',true)


      } else if (e.key === 'Home') {

        el.parentElement.children[0] && el.parentElement.children[0].focus()

      } else if (e.key === 'End') {

        // el.parentElement.children[input.value.length - 1] && el.parentElement.children[input.value.length - 1].focus()
        el.parentElement.children[input.value.length +4 ] && el.parentElement.children[input.value.length + 4].focus()

      } else if (e.key === 'ArrowLeft') {

        if (el.previousElementSibling) {
          if(el.previousElementSibling.dataset.index === '-1'){
            el.previousElementSibling.previousElementSibling.focus()
          }else{
            el.previousElementSibling.focus()
          }

        }

      } else if (e.key === 'ArrowRight') {

        if (el.nextElementSibling) {
          if(el.nextElementSibling.dataset.index === '-1'){
            el.nextElementSibling.nextElementSibling.focus()
          }else{
            el.nextElementSibling.focus()
          }

        }

      } else if (e.key === 'ArrowUp') {
        if (input.value[index] * 1 < 9) {
          input.value[index] = (input.value[index] * 1 + 1).toString()
        }
      } else if (e.key === 'ArrowDown') {
        if (input.value[index] * 1 > 0) {
          input.value[index] = (input.value[index] * 1 - 1).toString()
        }
      }
    }

    function keyup(e) {

      let index = e.target.dataset.index * 1;
      let el = e.target;

      if(e.key === 'Enter'){

        input.value[index] = ''

      }else{

        if (/Digit|Numpad/i.test(e.code)) {
          input.value[index] = e.code.replace(/Digit|Numpad/i, '')

          // 如果中间去掉加的东西，需要改这里
          if(el.nextElementSibling){

            if(el.nextElementSibling.dataset.index === '-1'){
              el.nextElementSibling.nextElementSibling.focus();

            }else{
              el.nextElementSibling && el.nextElementSibling.focus();
            }

          }

          if (index === 5) {
            if (input.value.join('').length === 6) {
              document.activeElement.blur();

              context.emit('complete',input.value)
              context.emit('disabled',false)
            }
          }

        } else {
          if (input.value[index] === '') {
            input.value[index] = ''
          }
        }

      }

    }

    function mousewheel(e) {
      let index = e.target.dataset.index;
      if (e.wheelDelta > 0) {
        if (input.value[index] * 1 < 9) {
          input.value[index] = (input.value[index] * 1 + 1).toString()
        }
      } else if (e.wheelDelta < 0) {
        if (input.value[index] * 1 > 0) {
          input.value[index] = (input.value[index] * 1 - 1).toString()
        }
      } else if (e.key === 'Enter') {

        if (input.value.join('').length === 6) {
          document.activeElement.blur();

          context.emit('complete',input.value)
          context.emit('disabled',false)
        }
      }
    }

    function  paste(e) {
      // console.log(e.clipboardData)
      // 当进行粘贴时
      e.clipboardData.items[0].getAsString(str => {
        if (str.toString().length === 6) {
          input.value = str.split('')
          document.activeElement.blur();
          context.emit('complete',input.value)
          context.emit('disabled',false)

        }
      })
    }

    const firstInput = ref(null)

    onMounted(()=>{
       firstInput.value.focus()
    })

    return {
      input,
      firstInput,
      pasteResult,
      inputEvent,
      keydown,
      keyup,
      mousewheel,
      paste

    }

  }

}
</script>

<style scoped>

.input-box{

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.input-box input{
  width: 44px;
  height: 44px;
//margin-right: 30px;

  border: 1px solid #98A2B3;
  border-radius: 6px;
  text-align: center;
  font-family: Inter, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 24px;

  color: #1D2939;

}


.input-box-space{

  width: 6px !important;
  height: 4px !important;
  background: #D0D5DD;
  border-radius: 0px !important;
  margin-right: 7px !important;
  margin-left: 7px;
  border: none !important;

}
</style>