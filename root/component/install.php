<?php
/**
 * @package     {%= name %}
 * @subpackage  Install
 *
 * @copyright   Copyright (C) {%= grunt.template.today('yyyy') %} {%= author_name %}. All rights reserved.
 * @license     {%= licenses.join(', ') %}
 */

// NO DIRECT ACCESS
defined('JPATH_PLATFORM') or die;
 
class com_{%= name.toLowerCase() %}InstallerScript
{
	/*
	 * PREFLIGHT
	 */
	function preflight( $type, $parent ) {
		$jversion = new JVersion();

		// INSTALLING COMPONENT MANIFEST FILE VERSION
		$this->release = $parent->get( "manifest" )->version;
		
		// MANIFEST FILE MINIMUM JOOMLA VERSION
		$this->minimum_joomla_release = $parent->get( "manifest" )->attributes()->version;   


		// ABORT IF THE CURRENT JOOMLA RELEASE IS OLDER
		if( version_compare( $jversion->getShortVersion(), $this->minimum_joomla_release, 'lt' ) ) {
			JFactory::getApplication()->enqueueMessage(JText::sprintf('COM_{%= name.toUpperCase() %}_MSG_ERROR_JVERSION', $this->minimum_joomla_release), 'error');
			return false;
		}
 
		// ABORT IF THE COMPONENT BEING INSTALLED IS NOT NEWER THAN THE CURRENTLY INSTALLED VERSION
		if ( $type == 'update' ) {
			$oldRelease = $this->getParam('version');
			$rel = $oldRelease . ' to ' . $this->release;
			if ( version_compare( $this->release, $oldRelease, 'le' ) ) {
				JFactory::getApplication()->enqueueMessage(JText::sprintf('COM_{%= name.toUpperCase() %}_MSG_ERROR_SCHEMA', $this->release), 'error');
				return false;
			}
		}
		else { $rel = $this->release; }
 
		echo '<p>' . JText::_('COM_{%= name.toUpperCase() %}_MSG_SUCCESS_PREFLIGHT') . '</p>';
	}
 
	/*
	 * INSTALL
	 */
	function install( $parent ) {
		echo '<p>' . JText::sprintf('COM_{%= name.toUpperCase() %}_MSG_SUCCESS_INSTALL', $this->release) . '</p>';
	}
 
	/*
	 * UPDATE
	 */
	function update( $parent ) {
		echo '<p>' . JText::sprintf('COM_{%= name.toUpperCase() %}_MSG_SUCCESS_UPDATE', $this->release) . '</p>';
	}
 
	/*
	 * POSTFLIGHT
	 */
	function postflight( $type, $parent ) {
		echo '<p>' . JText::_('COM_{%= name.toUpperCase() %}_MSG_SUCCESS_POSTFLIGHT') . '</p>';
	}

	/*
	 * UNINSTALL
	 */
	function uninstall( $parent ) {
		if(!isset($this->release)) $this->release = '1.0.1';
		echo '<p>' . JText::sprintf('COM_{%= name.toUpperCase() %}_MSG_SUCCESS_UNINSTALL', $this->release) . '</p>';
	}
 
	/*
	 * GET A VARIABLE FROM THE MANIFEST FILE (ACTUALLY, FROM THE MANIFEST CACHE).
	 */
	function getParam( $name ) {
		$db = JFactory::getDbo();
		$db->setQuery('SELECT manifest_cache FROM #__extensions WHERE name = "com_{%= name.toLowerCase() %}"');
		$manifest = json_decode( $db->loadResult(), true );
		return $manifest[ $name ];
	}
 
	/*
	 * SETS PARAMETER VALUES IN THE COMPONENT'S ROW OF THE EXTENSION TABLE
	 */
	function setParams($param_array) {
		if ( count($param_array) > 0 ) {
			// read the existing component value(s)
			$db = JFactory::getDbo();
			$db->setQuery('SELECT params FROM #__extensions WHERE name = "com_{%= name.toLowerCase() %}"');
			$params = json_decode( $db->loadResult(), true );
			// add the new variable(s) to the existing one(s)
			foreach ( $param_array as $name => $value ) {
				$params[ (string) $name ] = (string) $value;
			}
			// store the combined new and existing values back as a JSON string
			$paramsString = json_encode( $params );
			$db->setQuery('UPDATE #__extensions SET params = ' .
				$db->quote( $paramsString ) .
				' WHERE name = "com_{%= name.toLowerCase() %}"' );
				$db->query();
		}
	}
}
