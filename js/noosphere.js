// js/noosphere.js

/**
 * Manages the Vis.js network graph visualization.
 */
const Noosphere = {
    network: null,
    nodes: new vis.DataSet(),
    edges: new vis.DataSet(),
    container: null,
    tooltipElement: null,
    options: {
        layout: {
            hierarchical: false,
            randomSeed: 1,
            improvedLayout: true,
        },
        nodes: {
            borderWidth: 1,
            font: { color: '#ffffff', size: 12, face: 'Roboto', strokeWidth: 0 },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.5)', size: 5, x: 2, y: 2 },
            scaling: { min: 20, max: 50, label: { enabled: true, min: 12, max: 22 } }
        },
        edges: {
            width: 1.5,
            color: { color: '#606878', highlight: '#4fc3f7', hover: '#7fd3f8' },
            arrows: { to: { enabled: true, scaleFactor: 0.6, type: 'arrow' } },
            smooth: { type: "continuous", roundness: 0.5 }
        },
        physics: {
            enabled: true,
            solver: 'barnesHut',
            barnesHut: {
                gravitationalConstant: -10000,
                centralGravity: 0.15,
                springLength: 180,
                springConstant: 0.03,
                damping: 0.2,
                avoidOverlap: 0.3
            },
            stabilization: { enabled: true, iterations: 500, updateInterval: 25, fit: true }
        },
        interaction: { hover: true, tooltipDelay: 200, dragNodes: true, dragView: true, zoomView: true, navigationButtons: false }
    },

    /**
     * Initializes the network graph in the specified container.
     */
    init(containerId, tooltipContainerId) {
        this.container = document.getElementById(containerId);
        this.tooltipElement = document.getElementById(tooltipContainerId);
        if (!this.container || !this.tooltipElement) {
            console.error('Noosphere or tooltip container not found!');
            return;
        }
        this.network = new vis.Network(this.container, { nodes: this.nodes, edges: this.edges }, this.options);
        this.setupEventListeners();
    },

    /**
     * Sets up event listeners for the network graph (node selection, hover, etc.).
     */
    setupEventListeners() {
        this.network.on("selectNode", (params) => {
            if (params.nodes.length > 0) {
                const nodeId = params.nodes[0];
                const ideaData = IDEAS_DATA[nodeId];
                if (ideaData && typeof UI !== 'undefined') UI.updateDetailsView(ideaData);
            } else {
                if (typeof UI !== 'undefined') UI.updateDetailsView(null);
            }
        });

        this.network.on("hoverNode", (params) => {
            const nodeId = params.node;
            const ideaData = IDEAS_DATA[nodeId];
            if (ideaData) {
                const nodePosition = this.network.getPositions([nodeId])[nodeId];
                const canvasPos = this.network.canvasToDOM({ x: nodePosition.x, y: nodePosition.y });

                let tooltipText = `<strong>${ideaData.name}</strong> (Tier ${ideaData.tier})`;
                if (ideaData.description) tooltipText += `\n<em>${ideaData.description}</em>`;
                if (gameState.ideas[nodeId] !== undefined) tooltipText += `\nOwned: ${Utils.formatNumber(gameState.ideas[nodeId])}`;

                this.tooltipElement.innerHTML = tooltipText;
                this.tooltipElement.style.left = `${Math.min(canvasPos.x + 15, window.innerWidth - this.tooltipElement.offsetWidth - 10)}px`;
                this.tooltipElement.style.top = `${Math.min(canvasPos.y + 15, window.innerHeight - this.tooltipElement.offsetHeight - 10)}px`;
                this.tooltipElement.style.display = 'block';
            }
        });

        this.network.on("blurNode", () => { this.tooltipElement.style.display = 'none'; });
        this.network.on("dragStart", () => { this.tooltipElement.style.display = 'none'; });
    },

    /**
     * Adds a new node to the graph if it doesn't already exist.
     * @param {string} ideaId - The ID of the idea to add as a node.
     */
    addNode(ideaId) {
        const ideaData = IDEAS_DATA[ideaId];
        if (!ideaData || ideaId === 'fleeting_thought' || this.nodes.get(ideaId)) return;

        const nodeLabel = ideaData.name.replace(/Concept: |Insight: |Theory: |Paradigm: /g, '');
        let value;
        switch(ideaData.tier) {
            case 1: value = 20; break;
            case 2: value = 30; break;
            case 3: value = 40; break;
            case 4: value = 50; break;
            default: value = 15;
        }

        this.nodes.add({
            id: ideaId,
            label: nodeLabel,
            title: ideaData.name,
            group: ideaData.group || `tier${ideaData.tier}`,
            shape: ideaData.shape || 'ellipse',
            color: ideaData.color,
            value: value,
            level: ideaData.tier,
        });
    },

    /**
     * Adds a new edge between two nodes if it doesn't already exist.
     * @param {string} fromId - The ID of the source node.
     * @param {string} toId - The ID of the target node.
     */
    addEdge(fromId, toId) {
        const edgeId = `${fromId}-${toId}`;
        if (fromId === toId || !this.nodes.get(fromId) || !this.nodes.get(toId) || this.edges.get(edgeId)) {
            return;
        }
        this.edges.add({ id: edgeId, from: fromId, to: toId });
    },

    /**
     * Focuses the view on a specific node in the graph.
     * @param {string} nodeId - The ID of the node to focus on.
     */
    focusOnNode(nodeId) {
        if (this.network && this.nodes.get(nodeId)) {
            this.network.focus(nodeId, { scale: 1.3, animation: { duration: 800, easingFunction: "easeInOutQuad" } });
            this.network.selectNodes([nodeId], true);
            const ideaData = IDEAS_DATA[nodeId];
            if (ideaData && typeof UI !== 'undefined') UI.updateDetailsView(ideaData);
        }
    },

    /**
     * Clears and completely redraws the graph based on the current gameState.
     */
    renderFromGameState() {
        this.nodes.clear();
        this.edges.clear();

        gameState.discoveredIdeas.forEach(ideaId => {
            if (ideaId === 'fleeting_thought') return;
            this.addNode(ideaId);
        });

        Object.values(IDEAS_DATA).forEach(idea => {
            if (idea.id === 'fleeting_thought' || !idea.recipe) return;
            if (gameState.discoveredIdeas.has(idea.id) && idea.recipe.every(ing => gameState.discoveredIdeas.has(ing))) {
                idea.recipe.forEach(ingredientId => {
                    this.addEdge(ingredientId, idea.id);
                });
            }
        });
    }
};

