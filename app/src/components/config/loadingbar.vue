<script>
import { useLoadingBar } from 'naive-ui'

const Loadingbar = () => {
  // 全局变量定义
  window['$loadingbar'] = useLoadingBar()
  return null
}

export default Loadingbar
</script>
