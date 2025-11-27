<?php
/**
 * Plugin Name: Calendario Turni Farmacie WP
 * Plugin URI: https://github.com/meksone/calendario-turni-farmacie-wp
 * Description: Calendario turni farmacie italiano con drag & drop, ricerca live e export PDF.
 * Version: 1.0.0
 * Author: Meksone (con aiuto Grok xAI)
 * Author URI: https://github.com/meksone
 * License: GPLv2 or later
 * Text Domain: calendario-turni-farmacie-wp
 * Domain Path: /languages
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * Network: true  // Multisite ready
 */

// Evita accesso diretto
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'CTF_VERSION', '1.0.0' );
define( 'CTF_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'CTF_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

// Carica classi
require_once CTF_PLUGIN_PATH . 'includes/class-calendario-turni-cpt.php';
require_once CTF_PLUGIN_PATH . 'includes/class-calendario-turni-block.php';

// Inizializza
function ctf_init() {
    new Calendario_Turni_CPT();
    new Calendario_Turni_Block();
}
add_action( 'plugins_loaded', 'ctf_init' );

// Registra shortcode
function ctf_shortcode( $atts ) {
    $atts = shortcode_atts( array(
        'id' => get_the_ID(),
    ), $atts );
    ob_start();
    include CTF_PLUGIN_PATH . 'templates/shortcode-calendario.php';
    return ob_get_clean();
}
add_shortcode( 'ctf_calendario', 'ctf_shortcode' );
?>