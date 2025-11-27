<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Calendario_Turni_CPT {
    public function __construct() {
        add_action( 'init', array( $this, 'register_cpt' ) );
        add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
    }

    public function register_cpt() {
        $labels = array(
            'name' => __( 'Calendari Turni', 'calendario-turni-farmacie-wp' ),
            'singular_name' => __( 'Calendario Turni', 'calendario-turni-farmacie-wp' ),
            'menu_name' => __( 'Calendari Farmacie', 'calendario-turni-farmacie-wp' ),
            'add_new' => __( 'Aggiungi Calendario', 'calendario-turni-farmacie-wp' ),
            'add_new_item' => __( 'Aggiungi Nuovo Calendario', 'calendario-turni-farmacie-wp' ),
            'edit_item' => __( 'Modifica Calendario', 'calendario-turni-farmacie-wp' ),
            'new_item' => __( 'Nuovo Calendario', 'calendario-turni-farmacie-wp' ),
            'view_item' => __( 'Visualizza Calendario', 'calendario-turni-farmacie-wp' ),
            'search_items' => __( 'Cerca Calendari', 'calendario-turni-farmacie-wp' ),
        );

        $args = array(
            'labels' => $labels,
            'public' => true,
            'publicly_queryable' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'query_var' => true,
            'rewrite' => array( 'slug' => 'calendario-turni' ),
            'capability_type' => 'post',
            'has_archive' => true,
            'hierarchical' => false,
            'menu_position' => null,
            'menu_icon' => 'calendar-alt',
            'supports' => array( 'title', 'editor', 'custom-fields' ),
            'show_in_rest' => true,  // Per Gutenberg
        );

        register_post_type( 'ctf_calendario', $args );

        // Flush rewrite rules su attivazione (ma non qui)
        register_activation_hook( CTF_PLUGIN_PATH . 'calendario-turni-farmacie-wp.php', 'flush_rewrite_rules' );
    }

    public function enqueue_editor_assets() {
        wp_enqueue_script(
            'ctf-editor',
            CTF_PLUGIN_URL . 'assets/js/editor.js',
            array( 'wp-blocks', 'wp-element', 'wp-editor' ),
            CTF_VERSION,
            true
        );
        wp_enqueue_style(
            'ctf-editor-style',
            CTF_PLUGIN_URL . 'assets/css/editor.css',
            array( 'wp-edit-blocks' ),
            CTF_VERSION
        );
    }
}