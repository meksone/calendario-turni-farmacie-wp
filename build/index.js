// build/index.js - Block editor con drag & drop
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { useBlockProps, InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, DropdownMenu } = wp.components;
const { DragDropContext, Droppable, Draggable } = wp.components;  // Per drag & drop
const { useState } = wp.element;

registerBlockType( 'ctf/calendario-turni', {
    title: __( 'Calendario Turni Farmacie', 'calendario-turni-farmacie-wp' ),
    icon: 'calendar',
    category: 'widgets',
    attributes: {
        giorni: {
            type: 'array',
            default: Array(30).fill( '' ),  // 30 giorni default
        },
        templateLibrary: {
            type: 'array',
            default: [
                { id: 1, label: 'Farmacia Rossi', value: 'Farmacia Rossi - Via Roma' },
                { id: 2, label: 'Guardia Medica', value: 'Guardia Medica - Tel: 118' },
                { id: 3, label: 'Chiuso', value: 'Chiuso per ferie' },
            ],
        },
    },
    edit: ( { attributes, setAttributes } ) => {
        const blockProps = useBlockProps();
        const [ searchTerm, setSearchTerm ] = useState( '' );

        const handleDragEnd = ( result ) => {
            // Logica drag & drop tra template e caselle giorni
            if ( ! result.destination ) return;
            const newGiorni = Array.from( attributes.giorni );
            newGiorni[ result.destination.index ] = attributes.templateLibrary[ result.source.index ]?.value || '';
            setAttributes( { giorni: newGiorni } );
        };

        const filteredTemplates = attributes.templateLibrary.filter( t => 
            t.label.toLowerCase().includes( searchTerm.toLowerCase() )
        );

        return (
            <div { ...blockProps }>
                <InspectorControls>
                    <PanelBody title={ __( 'Template Library', 'calendario-turni-farmacie-wp' ) }>
                        <TextControl
                            label={ __( 'Cerca Template', 'calendario-turni-farmacie-wp' ) }
                            value={ searchTerm }
                            onChange={ setSearchTerm }
                        />
                        <Droppable droppableId="templates">
                            { ( provided ) => (
                                <ul { ...provided.droppableProps } ref={ provided.innerRef }>
                                    { filteredTemplates.map( ( template, index ) => (
                                        <Draggable key={ template.id } draggableId={ `temp-${template.id}` } index={ index }>
                                            { ( provided ) => (
                                                <li ref={ provided.innerRef } { ...provided.draggableProps } { ...provided.dragHandleProps }>
                                                    { template.label }
                                                </li>
                                            ) }
                                        </Draggable>
                                    ) ) }
                                    { provided.placeholder }
                                </ul>
                            ) }
                        </Droppable>
                    </PanelBody>
                </InspectorControls>
                <DragDropContext onDragEnd={ handleDragEnd }>
                    <Droppable droppableId="giorni">
                        { ( provided ) => (
                            <div className="ctf-giorni-grid" { ...provided.droppableProps } ref={ provided.innerRef }>
                                { attributes.giorni.map( ( giorno, index ) => (
                                    <Draggable key={ index } draggableId={ `giorno-${index}` } index={ index }>
                                        { ( provided ) => (
                                            <div className="ctf-cella-giorno" ref={ provided.innerRef } { ...provided.draggableProps } { ...provided.dragHandleProps }>
                                                { giorno || __( 'Trascina qui', 'calendario-turni-farmacie-wp' ) }
                                            </div>
                                        ) }
                                    </Draggable>
                                ) ) }
                                { provided.placeholder }
                            </div>
                        ) }
                    </Droppable>
                </DragDropContext>
            </div>
        );
    },
    save: () => null,  // Dinamico, salva in attributes
} );