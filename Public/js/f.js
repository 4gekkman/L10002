/*//================================================////
////																							  ////
////   j.js - функционал модели шаблона документа		////
////																								////
////================================================////
//// 			        		 	    	   ////
//// 			    Оглавление  			 ////
//// 			         				       ////
////=============================//*/
/**
 *
 *  s0. Функционал, доступный всему остальному функционалу
 *
 *		f.s0.sm_func									| s0.1. Показывает модальное окно с text, заголовком "ошибка" и кнопкой "закрыть"
 *		f.s0.txt_delay_save           | s0.2. Функционал "механизма отложенного сохранения для текстовых полей"
 *
 *  s1. Связанный с аккаунтом и аутентификацией функционал
 *
 *    f.s1.logout                   | s1.1. Выйти из своей учётной записи
 *    f.s1.save_steam_tradeurl      | s1.2. Сохранить Steam Trade URL
 *
 *
 *
 *
 *
 *
 */


//========================//
// 			        		 	    //
// 			 Функционал  			//
// 			         			    //
//====================----//
var LayoutModelFunctions = { constructor: function(self) { var f = this;


	//--------------------------------------------------------------------//
	// 			        		 			                                            //
	// 			 s0. Функционал, доступный всему остальному функционалу 			//
	// 			         					                                            //
	//--------------------------------------------------------------------//
	f.s0 = {};

		//----------------------------------------------------------------------------------//
		// s0.1. Показывает модальное окно с text, заголовком "ошибка" и кнопкой "закрыть"  //
		//----------------------------------------------------------------------------------//
		// - Применяется обычно при ajax-запросах, для при обработке серверных ошибок
		f.s0.sm_func = function(text) {
			return showModal({
				header: 'Ошибка',
				ok_name: 'Закрыть',
				cancel_name: '',
				width: 350,
				standard_css: '1',
				target: document.body,
				html: text,
				params: {},
				callback: function(arg, params){
					if(arg !== null) {}
					else {}
				}
			});
		};

		//-------------------------------------------------------------------------//
		// s0.2. Функционал "механизма отложенного сохранения для текстовых полей" //
		//-------------------------------------------------------------------------//
		f.s0.txt_delay_save = {};

			//----------------------------------------------------------------------//
			// 1] Применить "механизм отложенного сохранения для текстовых полей"   //
			//----------------------------------------------------------------------//
			// - Он особенно актуален для текстовых полей.
			// - Делает так, что функция сохранения срабатывает не при каждом нажатии.
			// - А лишь спустя заданные N секунд после последнего изменения.
			f.s0.txt_delay_save.use = function(savefunc){

				// 2.1. Остановить ранее запланированный setTimeout
				if(self.m.s0.txt_delay_save.settimeoutid())
					clearTimeout(self.m.s0.txt_delay_save.settimeoutid());

				// 2.2] Если время для сохранения не пришло
				if(+Date.now() - +self.m.s0.txt_delay_save.lastupdate() < +self.m.s0.txt_delay_save.gap) {

					// Поставить выполнение на таймер
					var timerId = setTimeout(savefunc, self.m.s0.txt_delay_save.gap);

					// Сохранить timerId в модель
					self.m.s0.txt_delay_save.settimeoutid(timerId);

					// Сохранить текущий timestamp в модель
					self.m.s0.txt_delay_save.lastupdate(Date.now());

					// Указать, что имееются не сохранённые данные
					self.m.s0.txt_delay_save.is_unsaved_data(1);

					// Завершить
					return 1;

				}

				// 2.3] Если время для сохранения пришло
				else {

					// Сохранить текущий timestamp в модель
					self.m.s0.txt_delay_save.lastupdate(Date.now());

				}

			};

			//-------------------------------------//
			// 2] Заблокировать закрытие документа //
			//-------------------------------------//
			// - Иными словами указать, что есть несохранённые данные.
			// - Попытка закрыть страницу в итоге приведёт к вызову модального confirm.
			f.s0.txt_delay_save.block = function(){
				self.m.s0.txt_delay_save.is_unsaved_data(1);
			};

			//--------------------------------------//
			// 3] Разблокировать закрытие документа //
			//--------------------------------------//
			// - Иными словами указать, что нет несохранённых данных.
			// - Попытка закрыть страницу в итоге уже не приведёт к вызову модального confirm.
			f.s0.txt_delay_save.unblock = function(){
				self.m.s0.txt_delay_save.is_unsaved_data(0);
			};


	//--------------------------------------------------------------------//
	// 			        		 			                                            //
	// 			 s1. Связанный с аккаунтом и аутентификацией функционал 			//
	// 			         					                                            //
	//--------------------------------------------------------------------//
	f.s1 = {};

		//-------------------------------------//
		// s1.1. Выйти из своей учётной записи //
		//-------------------------------------//
		f.s1.logout = function(data, event){

			// 1] Отправить запрос
			ajaxko(self, {
				url:          window.location.host + "/layouts/l10003",
				key: 	    		"L10003:1",
				from: 		    "ajaxko",
				data: 		    {},
				prejob:       function(config, data, event){

					// 1] Сообщить, что идёт сохранение нового trade url
					toastr.info("Подожди немного...", "Произвожу выход из твоего аккаунта", {
						timeOut: 					"9999999999999",
						extendedTimeOut: 	"9999999999999"
					});

				},
				postjob:      function(data, params){},
				ok_0:         function(data, params){

					// 1] Сообщить, что пользователи успешно отвязаны
					toastr.info("Перезагружаю документ...", "Успешный выход из аккаунта!", {
						timeOut: 					"9999999999999",
						extendedTimeOut: 	"9999999999999"
					});

					// 2] Перезагрузить страницу
          window.location.reload(true);

				}
			});

		};

		//---------------------------------//
		// s5.2. Сохранить Steam Trade URL //
		//---------------------------------//
		f.s1.save_steam_tradeurl = function(data, event){

			// 1] Если поле со Steam URL пусто, сообщит и завершить
			if(!self.m.s5.steam_tradeurl()) {
				toastr.info("Сначала введи свой торговый URL в Steam. Потом нажми кнопку 'Изменить'...", "Торговый URL пуст");
				return;
			}

			// 2] Отправить запрос
			ajaxko(self, {
				url:          window.location.host + "/layouts/l10002",
				key: 	    		"D10002:2",
				from: 		    "ajaxko",
				data: 		    {
					steam_tradeurl: self.m.s5.steam_tradeurl()
				},
				prejob:       function(config, data, event){

					// 1] Сообщить, что идёт сохранение нового trade url
					toastr.info("Произвожу проверку введённого торгового URL в Steam...", "Идёт проверка");

				},
				postjob:      function(data, params){},
				ok_0:         function(data, params){

					// 1] Сообщить, торговый URL успешно сохранён
					toastr.success("Твой торговый URL успешно принят и сохранён.", "Успех");

				},
				ok_2:         function(data, params){

					// 1] Сообщить, что ведён неверный Steam URL
					toastr.error("Мы проверили введённый тобой торговый URL. И оказалось, что он неправильный. Перепроверь его, и попробуй ещё раз.", "Неверный торговый URL", {
						timeOut: 					"15000",
						extendedTimeOut: 	"15000"
					});

				}
			});

		};









return f; }};




























