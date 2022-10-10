<template>
  <NLoadingBarProvider>
    <NDialogProvider>
      <Dialog />
      <NNotificationProvider>
        <Notification />
        <NMessageProvider>
          <Message />
          <slot></slot>
        </NMessageProvider>
      </NNotificationProvider>
    </NDialogProvider>
  </NLoadingBarProvider>
</template>

<script setup>
import Dialog from './dialog.vue'
import Notification from './notification.vue'
import Message from './message.vue'
import { NLoadingBarProvider, NDialogProvider, NMessageProvider, NNotificationProvider } from 'naive-ui'
</script>
