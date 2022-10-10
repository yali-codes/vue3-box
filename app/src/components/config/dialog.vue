<script>
import { useDialog } from 'naive-ui'

const Dialog = () => {
  // 全局变量定义
  window['$dialog'] = useDialog()
  return null
}

export default Dialog
</script>
