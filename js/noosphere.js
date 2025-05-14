// js/noosphere.js
const Noosphere = {
    network: null,
    nodes: new vis.DataSet(),
    edges: new vis.DataSet(),
    container: null,
    tooltipElement: null,
    options: {
        layout: {
            hierarchical: false, // Use 'false' for force-directed layout
            randomSeed: 1,       // For reproducible layouts during development; set to 'undefined' for varied layouts
            improvedLayout: true,
            // repulsion: { // Example of more specific physics tuning if needed
            //     centralGravity: 0.1,
            //     springLength: 150,
            //     springConstant: 0.02,
            //     nodeDistance: 120, // Min distance between nodes
            //     damping: 0.09
            // }
        },
        nodes: {
            borderWidth: 2,
            font: { color: '#ffffff', size: 12, face: 'Roboto', strokeWidth: 0, vadjust: 2 },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.4)', size: 7, x: 3, y: 3 },
            scaling: { // Node size based on its 'value' property
                min: 18, // Min size for smallest value
                max: 55, // Max size for largest value
                label: { enabled: true, min: 10, max: 20, drawThreshold: 5 }
            },
            // Default shape if not specified in IDEAS_DATA
            shape: 'ellipse',
        },
        edges: {
            width: 1.5,
            color: { color: '#606878', highlight: '#4fc3f7', hover: '#7fd3f8', inherit: 'from' },
            arrows: { to: { enabled: true, scaleFactor: 0.6, type: 'arrow' } },
            smooth: { type: "continuous", roundness: 0.5, enabled: true }
        },
        physics: {
            enabled: true,
            solver: 'barnesHut', // Good general-purpose solver
            barnesHut: {
                gravitationalConstant: -15000, // More spread out
                centralGravity: 0.1,         // Gentle pull to center
                springLength: 150,             // Ideal edge length
                springConstant: 0.025,
                damping: 0.15,                 // Slower stabilization, more organic
                avoidOverlap: 0.2              // How much nodes try to avoid overlap
            },
            stabilization: { // Stabilize layout on load/major changes
                enabled: true,
                iterations: 800,
                updateInterval: 25,
                onlyDynamicEdges: false,
                fit: true // Fit network to view after stabilization
            }
        },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            dragNodes: true,
            dragView: true,
            zoomView: true,
            navigationButtons: false, // Set to true to show Vis.js navigation buttons
            keyboard: true          // Enable keyboard navigation (zoom, pan)
        },
        groups: { // Define group styles for different idea tiers
            concept: { color: { background: '#29b6f6', border: '#01579b'}, shape: 'dot' },
            insight: { color: { background: '#ffee58', border: '#f57f17'}, shape: 'triangle' },
            theory:  { color: { background: '#ab47bc', border: '#4a148c'}, shape: 'square' },
            paradigm:{ color: { background: '#FFD700', border: '#B8860B'}, shape: 'pentagon' }
            // Add more groups if you have more tiers or types
        }
    },

    init(containerId, tooltipContainerId) {
        this.container = document.getElementById(containerId);
        this.tooltipElement = document.getElementById(tooltipContainerId);
        if (!this.container || !this.tooltipElement) {
            console.error('Noosphere DOM elements not found!');
            return;
        }
        try {
            this.network = new vis.Network(this.container, { nodes: this.nodes, edges: this.edges }, this.options);
            this.setupEventListeners();
        } catch (e) {
            console.error("Error initializing Vis.js network:", e);
            // Display a message to the user if Vis.js fails to load
            this.container.innerHTML = "<p style='color:red; padding:20px;'>Error: Could not initialize the Noosphere visualization. The Vis.js library might not be loaded correctly.</p>";
        }
    },

    setupEventListeners() {
        if (!this.network) return;

        this.network.on("selectNode", (params) => {
            if (params.nodes.length > 0) {
                const nodeId = params.nodes[0];
                const ideaData = IDEAS_DATA[nodeId];
                if (ideaData && typeof UI !== 'undefined') UI.updateDetailsView(ideaData);
            } else if (typeof UI !== 'undefined') {
                UI.updateDetailsView(null); // Clear details if no node selected
            }
        });

        this.network.on("hoverNode", (params) => {
            const nodeId = params.node;
            const ideaData = IDEAS_DATA[nodeId];
            if (ideaData && this.network) { // Check if network still exists
                try {
                    const nodePosition = this.network.getPositions([nodeId])[nodeId];
                    if (!nodePosition) return; // Node might have been removed
                    const canvasPos = this.network.canvasToDOM({ x: nodePosition.x, y: nodePosition.y });

                    let tooltipText = `<strong>${ideaData.name}</strong> (Tier ${ideaData.tier})`;
                    if (ideaData.description) tooltipText += `\n<hr style="border-color: #555; margin: 3px 0;"><em>${ideaData.description}</em>`;
                    if (GameLogic._isValidNumber(gameState.ideas[nodeId])) {
                        tooltipText += `\n<hr style="border-color: #555; margin: 3px 0;">Owned: ${Utils.formatNumber(gameState.ideas[nodeId])}`;
                    }
                    this.tooltipElement.innerHTML = tooltipText;
                    // Adjust tooltip position to stay within viewport
                    const tooltipRect = this.tooltipElement.getBoundingClientRect();
                    let left = canvasPos.x + 15;
                    let top = canvasPos.y + 15;
                    if (left + tooltipRect.width > window.innerWidth) left = canvasPos.x - tooltipRect.width - 15;
                    if (top + tooltipRect.height > window.innerHeight) top = canvasPos.y - tooltipRect.height - 15;

                    this.tooltipElement.style.left = `${Math.max(0,left)}px`;
                    this.tooltipElement.style.top = `${Math.max(0,top)}px`;
                    this.tooltipElement.style.display = 'block';
                    this.tooltipElement.setAttribute('aria-hidden', 'false');
                } catch (e) {
                    // console.warn("Error positioning tooltip:", e);
                    this.tooltipElement.style.display = 'none'; // Hide if error
                    this.tooltipElement.setAttribute('aria-hidden', 'true');
                }
            }
        });

        this.network.on("blurNode", () => { this.tooltipElement.style.display = 'none'; this.tooltipElement.setAttribute('aria-hidden', 'true'); });
        this.network.on("dragStart", () => { this.tooltipElement.style.display = 'none'; this.tooltipElement.setAttribute('aria-hidden', 'true');});

        // Fit network after stabilization, but perhaps only if few nodes, or on demand
        // this.network.on("stabilized", () => {
        //     if (this.nodes.length < 20) this.network.fit(); // Example condition
        // });
    },

    addNode(ideaId) {
        const ideaData = IDEAS_DATA[ideaId];
        if (!ideaData || ideaId === 'fleeting_thought' || this.nodes.get(ideaId)) return; // Skip if no data, FT, or already exists

        const nodeLabel = ideaData.name.replace(/^(Concept|Insight|Theory|Paradigm): /g, '');
        let value; // For node scaling
        switch(ideaData.tier) {
            case 1: value = 18; break; // Concepts
            case 2: value = 28; break; // Insights
            case 3: value = 40; break; // Theories
            case 4: value = 55; break; // Paradigms
            default: value = 15;
        }

        const nodeDefinition = {
            id: ideaId,
            label: nodeLabel,
            title: ideaData.name, // Vis.js native tooltip (can be augmented by our custom one)
            group: ideaData.group || `tier${ideaData.tier}`, // Used for group styling if defined in options
            shape: ideaData.shape || this.options.nodes.shape, // Use idea-specific shape or default
            color: ideaData.color, // Vis.js handles { background: ..., border: ... }
            value: value,
            level: ideaData.tier // Can be used for hierarchical layout (if enabled)
        };
        this.nodes.add(nodeDefinition);
    },

    addEdge(fromId, toId) {
        const edgeId = `${fromId}-${toId}`;
        // Ensure both nodes exist in the DataSet before adding an edge
        if (fromId === toId || !this.nodes.get(fromId) || !this.nodes.get(toId) || this.edges.get(edgeId)) {
            return;
        }
        this.edges.add({ id: edgeId, from: fromId, to: toId });
    },

    focusOnNode(nodeId) {
        if (this.network && this.nodes.get(nodeId)) {
            this.network.focus(nodeId, {
                scale: 1.3, // Zoom level
                animation: { duration: 800, easingFunction: "easeInOutQuad" }
            });
            this.network.selectNodes([nodeId], true); // Highlight the node
            const ideaData = IDEAS_DATA[nodeId];
            if (ideaData && typeof UI !== 'undefined') UI.updateDetailsView(ideaData); // Update right panel
        }
    },

    /**
     * Clears and rebuilds the entire Noosphere graph based on the current gameState.
     * Typically called after loading a game or major structural changes like Transcendence.
     */
    renderFromGameState() {
        if (!this.network) {
            console.warn("Noosphere.renderFromGameState called before network initialization.");
            return;
        }
        this.nodes.clear();
        this.edges.clear();

        // Add nodes for all discovered ideas (except FT)
        gameState.discoveredIdeas.forEach(ideaId => {
            if (ideaId !== 'fleeting_thought') this.addNode(ideaId);
        });

        // Rebuild edges based on discovered recipes that have also been synthesized
        Object.values(IDEAS_DATA).forEach(idea => {
            if (idea.id === 'fleeting_thought' || !idea.recipe) return;

            // Edge only if the product idea itself has been discovered (i.e., synthesized at least once)
            // AND all its ingredients are also discovered (which should be true if product is discovered via recipe)
            if (gameState.discoveredIdeas.has(idea.id) &&
                idea.recipe.every(ing => gameState.discoveredIdeas.has(ing))) {
                idea.recipe.forEach(ingredientId => {
                    this.addEdge(ingredientId, idea.id);
                });
            }
        });

        // Optionally fit the network after a full render.
        // Be cautious as this can override user's current zoom/pan.
        // this.network.fit();
    }
};