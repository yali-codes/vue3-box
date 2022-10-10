<script>
import { useMessage } from 'naive-ui'

const Message = () => {
  // 全局变量定义
  window['$message'] = useMessage()
  return null
}

export default Message
</script>
