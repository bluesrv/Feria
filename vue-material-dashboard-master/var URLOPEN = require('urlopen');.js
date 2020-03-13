var URLOPEN = require('urlopen');
var HM = require('header-metadata');
var serviceVars = require("service-metadata");

session.INPUT.readAsJSON(function (error, json) {
	var ctx = session.name('cache') || session.createContext('cache'); // ESTA VARIABLE CONSISTE EN SUBIR A CONTEXTO ALGUNAS VARIABLES IMPORTANTES
	if (error) {
		ctx.setVar('retorno', '1');
		ctx.setVar('error', '1');
		ctx.setVar('EstadoServicio', '100');
		ctx.setVar('EstadoServicioDesc', 'No es posible leer JSON de entrada ' + error);
		ctx.setVar('is_data', '1');
		session.reject('No es posible leer JSON de entrada ' + error);
	} else {
	
		var varSensibles = ctx.getVar('validateData');

		if(varSensibles){


			var validateContextService = session.parameters.validaContextoURL;
			var IdService = (serviceVars.URI.split('/')[3]).toUpperCase();
			var KEY = HM.current.headers["KEY"];
			var MsgId= HM.current.headers["access-token"];
			
			ctx.setVar('IdService', HM.current.headers);

			var varSensibles = varSensibles.split(';');
			var validationData = {};

            ctx.setVar('USU_RUT', varSensibles);
            
            for(i=0; i<varSensibles.length;i++){
                validationData[lista[i]]=json[lista[i]];
            }
			

			var input =  {
				"IdService":IdService,
				"DataServices": validationData,
				"MessageId":MsgId,
				"Key":KEY,
				"Group":session.parameters.Group
			};


			var options = {
				target: validateContextService,
				method: 'POST',
				timeout: 60,
				data: input
			};

			URLOPEN.open(options, function (error, header) {
				if (error) {
					ctx.setVar('EstadoServicio', '600');
					ctx.setVar('EstadoServicioDesc', 'Error en servicio de contexto');
					ctx.setVar('is_data', '1');
					session.reject('Error en servicio de contexto');
				} else {



					header.readAsBuffer(function (errorBody, body) {
						if (errorBody) {
							
							ctx.setVar('EstadoServicio', '600');
							ctx.setVar('EstadoServicioDesc', errorBody);
							ctx.setVar('is_data', '1');
							session.reject(errorBody);
							throw errorBody;
						} else {
							var responseJson = JSON.parse(body);
							
							ctx.setVar('resposeContexto', responseJson);
							
						
						}
					});
				}
			});
		}
	}
});