<?php /* =================================================////
////																										  ////
////                     Шаблон L-пакета				          ////
////																										  ////
////======================================================////
//// 			        		 		   ////
//// 			  Оглавление			 ////
//// 			         				   ////
////=========================////


    А. Содержимое HEAD html-разметки шаблона
    ----------------------------------------
      А1. Подключение тэга title с названием документа
      А2. Подключение локального CSS документа

    Б. Содержимое BODY html-разметки шаблона
    ----------------------------------------
      Б1. ...

    В. Подключение ресурсов шаблона
    -------------------------------
      В1. Принять данные для шаблона с сервера
      В2. Подключение JS-скрипта наследника шаблона


////=====================================================*/ ?>

<!doctype html>
<html lang="ru">


<?php /*----------------------------------------->
<!-- А. Содержимое HEAD html-разметки шаблона  -->
<!-------------------------------------------*/ ?>
<head>
  <meta charset="UTF-8">

  <?php /*-- А1. Подключение тэга title с названием документа -->
  <!--------------------------------------------------------*/ ?>
  @yield('title')

  <?php /*-- А2. Подключение локального CSS документа -->
  <!------------------------------------------------*/ ?>
  @yield('css')

</head>

<?php /*----------------------------------------->
<!-- Б. Содержимое BODY html-разметки шаблона  -->
<!----------------------------------------------->

  1. Фиксированная шапка сайта
    1.1. Область шапки над чатом и гл.меню (для логотипа)
    1.2. Область шапки справа от логотипа
      1.2.1. Блок фиксированных элементов управления в правой части

  x. Контентная область


---------------------------------------------*/ ?>
<body>

  <?php /*---------------------------->
  <!-- 1. Фиксированная шапка сайта -->
  <!------------------------------*/ ?>
  <div class="site-header">

    <?php /*----------------------------------------------------->
    <!-- 1.1. Область шапки над чатом и гл.меню (для логотипа) -->
    <!-------------------------------------------------------*/ ?>
    <div class="area1">

      <div class="logo">
        <img src="{!! asset('public/L10002/assets/images/main_logo.svg') !!}">
      </div>

    </div>

    <?php /*------------------------------------->
    <!-- 1.2. Область шапки справа от логотипа -->
    <!---------------------------------------*/ ?>
    <div class="area2">

      <?php /*---------------------------------------->
      <!-- 1.2.1. Элементы управления главного меню -->
      <!------------------------------------------*/ ?>
      <div class="area2-2">

        <?php /*-------------------------------------------->
        <!-- 1.2.1.2. Блок эл-в управления в правой части -->
        <!----------------------------------------------*/ ?>
        <div class="rightblock">

          <?php /*--------------------------------------------->
          <!-- 1] Кнопка "Log in" (показывать только гостям) -->
          <!-----------------------------------------------*/ ?>
          <div style="display: none" class="login_button" data-bind="visible: !m.s0.is_logged_in()" onclick="if(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) window.open('{!! (\Request::secure() ? "https://" : "http://") . (\Request::getHost()) . ":" . (\Request::getPort()); !!}/authwith?provider=steam'); else popupCenter('{!! (\Request::secure() ? "https://" : "http://") . (\Request::getHost()) . ":" . (\Request::getPort()); !!}/authwith?provider=steam','steam','1024','768');")>
            <i class="fa fa-fw fa-steam"></i>
            <span>Log in</span>
          </div>

        </div>

      </div>


    </div>



  </div>



  <?php /*--------------------->
  <!-- x. Контентная область -->
  <!-----------------------*/ ?>
  <div data-bind="allowBindings: false">
    <div id="content" class="content">
      @yield('content')
    </div>
  </div>

</body>
</html>


<?php /*-------------------------------->
<!-- В. Подключение ресурсов шаблона  -->
<!----------------------------------*/ ?>

  <?php /*----------------------------------------->
  <!-- В1. Принять данные для шаблона с сервера  -->
  <!-------------------------------------------*/ ?>
  <script>

    // 1. Подготовить объект для JS-кода шаблона
    var layout_data = {};

    // 2. Принять данные для шаблона

      // 2.1. Принять csrf_token
      layout_data.csrf_token  = "{{ csrf_token() }}";

      // 2.2. Принять переданные из контроллера данные
      layout_data.data        =  {!! $data !!};

  </script>

  <?php /*---------------------------------------------->
  <!-- В2. Подключение JS-скрипта наследника шаблона  -->
  <!------------------------------------------------*/ ?>

    <?php /* JS наследника шаблона */ ?>
    @yield('js')

  <?php /*--------------------------------------->
  <!-- В3. Подключение счётчика Яндекс.Метрики -->
  <!-----------------------------------------*/ ?>
  <script type="text/javascript">
      (function (d, w, c) {
          (w[c] = w[c] || []).push(function() {
              try {
                  w.yaCounter41412929 = new Ya.Metrika({
                      id:41412929,
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true,
                      webvisor:true,
                      trackHash:true
                  });
              } catch(e) { }
          });

          var n = d.getElementsByTagName("script")[0],
              s = d.createElement("script"),
              f = function () { n.parentNode.insertBefore(s, n); };
          s.type = "text/javascript";
          s.async = true;
          s.src = "https://mc.yandex.ru/metrika/watch.js";

          if (w.opera == "[object Opera]") {
              d.addEventListener("DOMContentLoaded", f, false);
          } else { f(); }
      })(document, window, "yandex_metrika_callbacks");
  </script>
  <noscript><div><img src="https://mc.yandex.ru/watch/41412929" style="position:absolute; left:-9999px;" alt="" /></div></noscript>

  <?php /*----------------------------------------->
  <!-- В4. Подключение счётчика Google Analitycs -->
  <!-------------------------------------------*/ ?>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-88629903-1', 'auto');
    ga('send', 'pageview');

  </script>






