<?php
// No direct access to this file
defined('_JEXEC') or die('Restricted access');
 
// import Joomla controller library
jimport('joomla.application.component.controller');
 


class {%= name %}Controller extends JController
{
    function display($cachable = false) {
        parent::display($cachable);
    }
}
