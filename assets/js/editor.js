// Sidebar per preview calendario nel block editor
wp.data.subscribe( function() {
    const { select } = wp.data;
    const currentPostId = select( 'core/editor' ).getCurrentPostId();
    if ( currentPostId && select( 'core/editor' ).getCurrentPostType() === 'ctf_calendario' ) {
        // Aggiungi sidebar plugin con preview
        const { registerPlugin } = wp.plugins;
        const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
        const { PanelBody, TextControl } = wp.components;
        const { __ } = wp.i18n;

        const CalendarioSidebar = () => (
            <PluginSidebar
                name="ctf-sidebar"
                title={ __( 'Impostazioni Calendario', 'calendario-turni-farmacie-wp' ) }
            >
                <PanelBody>
                    <p>{ __( 'Anteprima giorni qui (drag & drop in v2).', 'calendario-turni-farmacie-wp' ) }</p>
                </PanelBody>
            </PluginSidebar>
        );

        registerPlugin( 'ctf-sidebar', { render: CalendarioSidebar } );
    }
} );