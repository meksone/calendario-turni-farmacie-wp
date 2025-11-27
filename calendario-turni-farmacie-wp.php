<?php
/**
 * Plugin Name:       Calendario Turni Farmacie WP
 * Plugin URI:        https://github.com/meksone/calendario-turni-farmacie-wp
 * Description:       Calendario turni farmacie italiano con drag & drop, ricerca live e export PDF.
 * Version:           1.0.0
 * Author:            Meksone (con turbo da Grok xAI)
 * Author URI:        https://github.com/meksone
 * License:           GPLv2 or later
 * Text Domain:       calendario-turni-farmacie-wp
 * Domain Path:       /languages
 * Requires at least: 6.2
 * Requires PHP:      8.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'CTF_VERSION', '1.0.0' );
define( 'CTF_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'CTF_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

// === 1. Registriamo automaticamente il block Gutenberg (grazie a block.json + @wordpress/scripts)
function ctf_register_block() {
    // Il block si registra da solo grazie a block.json nella root
    // Non serve fare nulla qui se hai eseguito `npx @wordpress/create-block`
}
add_action( 'init', 'ctf_register_block' );

// === 2. Shortcode [ctf_calendario id="123"]
function ctf_shortcode( $atts ) {
    $atts = shortcode_atts( array(
        'id' => get_the_ID(),
    ), $atts, 'ctf_calendario' );

    $post_id = absint( $atts['id'] );
    if ( ! $post_id ) return '<p>ID calendario mancante.</p>';

    ob_start();
    include CTF_PLUGIN_PATH . 'templates/shortcode-calendario.php';
    return ob_get_clean();
}
add_shortcode( 'ctf_calendario', 'ctf_shortcode' );

// === 3. Carica file template e classi extra (se ne aggiungeremo)
require_once CTF_PLUGIN_PATH . 'includes/class-ctf-settings.php';

// Attivazione / disattivazione
register_activation_hook( __FILE__, 'flush_rewrite_rules' );