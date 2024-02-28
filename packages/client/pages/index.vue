<script setup>
const { apiBase } = useRuntimeConfig().public;

const errorMessage = ref('');

const form = reactive({
  sample: '',
  token: ''
})

const validSampleForm = computed(() => form.sample.length > 0);
const validTokenForm = computed(() => form.token.length > 0);

const token = ref(null);
const verified = ref(null); // null, true, false
const copied = ref(false);

async function createToken(sample){
  const response = await fetch(`${apiBase}/tokens/${sample}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if(response.ok){
    const body = await response.json();
    token.value = body.token;
    form.sample = '';
  } else {
    errorMessage.value = 'Failed to create token';
  }
}

async function verifyToken(token){
  const response = await fetch(`${apiBase}/tokens/${token}/verify`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if(response.ok){
    const body = await response.json();
    verified.value = body.verified;
    form.token = '';
  } else {
    errorMessage.value = 'Failed to verify token';
  }
}

async function copy(text){
  await navigator.clipboard.writeText(text);

  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 3000);
}
</script>

<template>
  <div class="max-w-lg mx-auto p-1 flex flex-col justify-center">
    <div class="basis-1/2 place-self-center">
      <p class="text-2xl font-bold">Client Application</p>
      <p class="text-lg">Example Kubernetes App</p>
    </div>

    <div class="bg-slate-300 mt-2 p-2 basis-1/2 flex flex-col gap-4">
      <input v-model="form.sample" class="col-span-2 bg-slate-200 p-2" type="text" placeholder="Enter sample" />
      <button :class="`${validSampleForm ? 'bg-blue-500' : 'bg-slate-500'} p-2`" :disabled="!validSampleForm" @click="createToken(form.sample)">Create Token</button>
      
      <div v-if="token" class="h-fit mt-2 text-wrap">
        <div class="flex flex-row justify-between">
          <div class="text-xl font-semibold">Token</div>
          <button :class="`${copied ? 'bg-green-400 transition ease-in-out scale-110' : 'bg-slate-400'} p-2 text-sm`" @click="copy(token)">Copy</button>
        </div>
        <div class="w-full text-lg" style="overflow-wrap: anywhere;">{{ token }}</div>
      </div>
    </div>

    <div class="bg-slate-300 mt-2 p-2 basis-1/2 flex flex-col gap-4">
      <input v-model="form.token" class="col-span-2 bg-slate-200 p-2" type="text" placeholder="Enter token" />
      <button :class="`${validTokenForm ? 'bg-green-500' : 'bg-slate-500'} p-2`" :disabled="!validTokenForm" @click="verifyToken(form.token)">Verify Token</button>
      
      <div v-if="verified !== null" class="mt-2 basis-1/2">
        <p class="text-xl font-semibold">Verified</p>
        <p :class="`${verified ? 'text-green-500' : 'text-red-500'} text-lg font-semibold`">{{ verified }}</p>
      </div>
    </div>



  </div>
</template>