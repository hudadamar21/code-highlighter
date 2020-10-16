<template>
  <InputKodeBaru />
  <ListKode />
</template>

<script>
import InputKodeBaru from '@/views/section/InputKodeBaru';
import ListKode from '@/views/section/ListKode';

export default {
  title: 'Code Highlighter',
  components: {
    InputKodeBaru,
    ListKode
  }
}
</script>

<style>
  .shiki__meta{
    display: flex;
    justify-content: space-between;
    margin: 5px;
    margin-bottom: 10px;
    padding-bottom: 5px;
    color:#ececec;
    border-bottom: 1px solid #ececec;
  }
  .shiki__code .dim{
    padding: 1px 10px;
    
  }
  .shiki__code * .dim{
    opacity: 0.6;
    transition: opacity .2s;
  }
  .shiki__code:hover * .dim{
    opacity: 1;
  }
  .shiki__code .highlight{
    border-left: 4px solid rgb(14, 103, 206);
    padding: 2px 10px;
    background: rgb(5, 13, 34);
  }
  .shiki__code .highlight * span {
    background: rgb(5, 13, 34);
  }
  
</style>