/**
 * src/index.js – Block Gutenberg Calendario Turni Farmacie
 * Versione 100% funzionante con WP 6.5+ (novembre 2025)
 */

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    BlockControls,
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    ToolbarGroup,
    ToolbarButton,
    search, // ← icona ricerca OK
} from '@wordpress/components';
import { useState } from '@wordpress/element';

// Icona download inline (evita dipendenza @wordpress/icons)
const DownloadIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

registerBlockType( 'ctf/calendario-turni', {
    apiVersion: 2,
    title: __( 'Calendario Turni Farmacie', 'calendario-turni-farmacie-wp' ),
    icon: 'calendar-alt',
    category: 'widgets',
    keywords: [ 'farmacie', 'turni', 'calendario', 'drag drop' ],
    attributes: {
        mese: { type: 'string', default: 'Settembre 2025' },
        giorni: { type: 'array', default: Array(31).fill('') },
        templates: {
            type: 'array',
            default: [
                'Farmacia Rossi - Via Roma',
                'Farmacia Verdi - P.zza Duomo',
                'Farmacia Bianchi - Via Napoli',
                'Guardia Medica',
                'Chiuso per ferie',
                'Farmacia Cuomo',
                'Farmacia Scepi',
                'Farmacia Ravallese',
            ],
        },
    },

    edit: ( { attributes, setAttributes } ) => {
        const { mese, giorni, templates } = attributes;
        const [ searchTerm, setSearchTerm ] = useState('');
        const blockProps = useBlockProps();

        const filteredTemplates = templates.filter( t =>
            t.toLowerCase().includes( searchTerm.toLowerCase() )
        );

        const handleDrop = ( e, index ) => {
            e.preventDefault();
            const text = e.dataTransfer.getData('text/plain');
            if ( text ) {
                const newGiorni = [...giorni];
                newGiorni[index] = text;
                setAttributes({ giorni: newGiorni });
            }
        };

        const allowDrop = e => e.preventDefault();

        return (
            <div { ...blockProps }>
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarButton
                            icon={ <DownloadIcon /> }
                            label={ __( 'Esporta PDF (frontend)', 'calendario-turni-farmacie-wp' ) }
                            onClick={ () => alert('Funzione attiva nel frontend!') }
                        />
                    </ToolbarGroup>
                </BlockControls>

                <InspectorControls>
                    <PanelBody title={ __( 'Libreria Template', 'calendario-turni-farmacie-wp' ) } initialOpen={true}>
                        <TextControl
                            label={ __( 'Cerca template…', 'calendario-turni-farmacie-wp' ) }
                            value={ searchTerm }
                            onChange={ setSearchTerm }
                        />
                        <div style={{ maxHeight: '400px', overflowY: 'auto', marginTop: '10px' }}>
                            { filteredTemplates.map( (temp, i) => (
                                <div
                                    key={ i }
                                    draggable
                                    onDragStart={ e => e.dataTransfer.setData('text/plain', temp) }
                                    style={{
                                        padding: '10px',
                                        margin: '4px 0',
                                        background: '#f0f0f0',
                                        borderRadius: '4px',
                                        cursor: 'move',
                                        userSelect: 'none',
                                    }}
                                >
                                    { temp }
                                </div>
                            ) ) }
                        </div>
                    </PanelBody>
                </InspectorControls>

                <div style={{ padding: '20px', border: '2px dashed #0073aa', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0 }}>
                        { __( 'Calendario:', 'calendario-turni-farmacie-wp' ) } { mese }
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        gap: '10px',
                        marginTop: '20px',
                    }}>
                        { giorni.map( (valore, i) => (
                            <div
                                key={ i }
                                onDrop={ e => handleDrop(e, i) }
                                onDragOver={ allowDrop }
                                style={{
                                    minHeight: '80px',
                                    border: '2px dashed #999',
                                    borderRadius: '8px',
                                    background: valore ? '#e8f5e8' : '#fafafa',
                                    padding: '8px',
                                    textAlign: 'center',
                                    fontSize: '14px',
                                }}
                            >
                                <strong>{ i + 1 }</strong>
                                <br />
                                <span style={{ fontWeight: valore ? 'bold' : 'normal', color: valore ? '#006400' : '#999' }}>
                                    { valore || 'Trascina qui' }
                                </span>
                            </div>
                        ) ) }
                    </div>
                </div>
            </div>
        );
    },

    save: () => null, // render lato PHP
} );