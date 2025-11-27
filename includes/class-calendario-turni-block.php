<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Calendario_Turni_Block {
    public function __construct() {
        add_action( 'init', array( $this, 'register_block_type' ) );
        add_action( 'enqueue_block_assets', array( $this, 'enqueue_block_assets' ) );
    }

    public function register_block_type() {
        register_block_type( CTF_PLUGIN_PATH . 'build', array(
            'api_version' => 3,
            'editor_script' => 'file:./index.js',
            'editor_style'  => 'file:./index.css',
            'style'         => 'file:./style.css',
            'render_callback' => array( $this, 'render_block' ),
            'attributes' => array(
                'calendarioId' => array(
                    'type' => 'number',
                    'default' => 0,
                ),
            ),
        ) );
    }

    public function enqueue_block_assets() {
        // Assets per frontend e editor
        wp_enqueue_script( 'ctf-block', CTF_PLUGIN_URL . 'build/index.js', array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ), CTF_VERSION );
        wp_enqueue_style( 'ctf-block-style', CTF_PLUGIN_URL . 'build/style.css', array(), CTF_VERSION );
    }

    public function render_block( $attributes ) {
        $post_id = $attributes['calendarioId'];
        if ( ! $post_id ) {
            return '<p>' . __( 'Seleziona un calendario.', 'calendario-turni-farmacie-wp' ) . '</p>';
        }
        // Renderizza da template con dati del post
        ob_start();
        $giorni = get_post_meta( $post_id, 'ctf_giorni', true ) ?: array();  // Array giorni da meta
        include CTF_PLUGIN_PATH . 'templates/block-render.php';
        return ob_get_clean();
    }
}