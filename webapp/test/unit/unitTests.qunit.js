/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"fiori_odata_001/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
