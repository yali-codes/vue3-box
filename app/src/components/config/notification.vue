<script>
import { useNotification } from 'naive-ui'

const Notification = () => {
  // 全局变量定义
  window['$notification'] = useNotification()
  return null
}

export default Notification
</script>
