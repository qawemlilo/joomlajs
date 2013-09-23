<?php
/**
 * Subtext Default Site View
 
 * @package		Subtext
 * @subpackage	Components
 * @license		GNU/GPL
 */

// REQUIRE THE BASE VIEW
jimport( 'joomla.application.component.view');

class {%= name %}View{%= name %} extends JView
{
	function display($tpl = null)
	{
		parent::display($tpl);
	}
}
