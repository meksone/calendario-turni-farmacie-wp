<?php if ( ! empty( $giorni ) ): ?>
<div class="ctf-calendario">
    <?php foreach ( $giorni as $giorno ): ?>
        <div class="ctf-giorno"><?php echo esc_html( $giorno['nome'] ?? 'Giorno vuoto' ); ?></div>
    <?php endforeach; ?>
</div>
<?php endif; ?>