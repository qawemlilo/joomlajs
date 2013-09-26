<?php
defined('_JEXEC') or die('Restricted access');


jimport('joomla.application.component.controller');
 

// Get an instance of the controller prefixed by {%= name %}
// it will create a controller named {%= name.toLowerCase() %}Controller using the controller.php file
$controller = JController::getInstance('{%= name %}');

 

// Perform the Request task
$controller->execute(JRequest::getCmd('task'));

$controller->redirect();
