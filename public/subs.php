<? php
header('Access-Control-Allow-Origin: *');

if (isset($_GET['f']) && substr($_GET['f'], 0, 4) === 'http') {
  header("Content-Type:text/vtt;charset=utf-8");
  echo file_get_contents($_GET['f']);
}
