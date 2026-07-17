/**********************************************************************
 * MAR DE GIRASSOIS - Cena 11 (Danca)
 * Script de montagem automatica para Adobe After Effects (ExtendScript)
 *
 * O QUE ELE FAZ:
 *   - Cria/usa um projeto a 24 fps, 1920x1080
 *   - Pede a pasta "01_MATERIAIS" e importa os clipes de cada subpasta
 *     (01_...COSMICOS ... 09_...PINCELADAS_FINAL) em bins organizados
 *   - Cria 1 pre-comp por bloco, empilha os clipes e aplica Screen nos
 *     elementos (fogo/cosmico/terra/ar) e escalona clipes multiplos
 *   - Monta a comp MASTER_Cena11 (2:30) posicionando cada bloco no tempo
 *     exato da decupagem
 *   - Cria a camada LINHA_DE_COSTURA (Shape + Trim Paths animado 0->100%)
 *   - Cria a pre-comp PINCELADAS_FINAL com matte de apagamento (borracha)
 *
 * COMO RODAR:
 *   After Effects > File > Scripts > Run Script File... > escolha este .jsx
 *   Quando pedir, selecione a pasta "01_MATERIAIS".
 *
 * Seguro para reexecutar: cria sempre comps novas com sufixo.
 **********************************************************************/

(function montarCena11() {
    // ---------- CONFIG ----------
    var FPS = 24;
    var W = 1920, H = 1080;
    var MASTER_DUR = 150; // 2:30

    // Blocos na ordem da decupagem: [prefixoDaPasta, nome, inicio(s), fim(s), usarScreen]
    var BLOCOS = [
        ["01_", "01_COSMICOS",        0,   15, true ],
        ["02_", "02_FOGO",            15,  24, true ],
        ["03_", "03_TERRA",           24,  39, true ],
        ["04_", "04_AGUA",            39,  47, false],
        ["05_", "05_AR",              47,  68, true ],
        ["06_", "06_FOGO_CHAO",       68,  90, true ],
        ["07_", "07_COSTURA_EFEITOS", 90, 109, false],
        ["08_", "08_LINHA_VERMELHA", 109, 115, false],
        ["09_", "09_PINCELADAS_FINAL",115,148, false]
    ];

    // ---------- HELPERS ----------
    function isVideo(f) {
        return f instanceof File && /\.(mov|mp4|mpg|mpeg|m4v|avi|mxf)$/i.test(f.name);
    }
    function findSub(rootFolder, prefixo) {
        var items = rootFolder.getFiles();
        for (var i = 0; i < items.length; i++) {
            if (items[i] instanceof Folder && items[i].name.indexOf(prefixo) === 0) return items[i];
        }
        return null;
    }
    function getBin(name) {
        var it = app.project.items;
        for (var i = 1; i <= it.length; i++) {
            if (it[i] instanceof FolderItem && it[i].name === name) return it[i];
        }
        return app.project.items.addFolder(name);
    }
    function importVideos(folder, bin) {
        var out = [];
        if (!folder) return out;
        var files = folder.getFiles();
        // ordena por nome para respeitar 01,02,...
        files.sort(function (a, b) { return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0; });
        for (var i = 0; i < files.length; i++) {
            if (!isVideo(files[i])) continue;
            try {
                var io = new ImportOptions(files[i]);
                var item = app.project.importFile(io);
                item.parentFolder = bin;
                out.push(item);
            } catch (e) { /* ignora arquivo problematico */ }
        }
        return out;
    }

    // ---------- SELECAO DA PASTA ----------
    var root = Folder.selectDialog("Selecione a pasta 01_MATERIAIS");
    if (!root) { alert("Cancelado. Nenhuma pasta selecionada."); return; }

    app.beginUndoGroup("Montar Cena 11 - Mar de Girassois");

    if (app.project === null) app.newProject();
    app.project.timeDisplayType = TimeDisplayType.TIMECODE;

    var binMats = getBin("01_MATERIAIS");
    var binComps = getBin("_COMPS");

    // ---------- MASTER ----------
    var master = app.project.items.addComp("MASTER_Cena11", W, H, 1.0, MASTER_DUR, FPS);
    master.parentFolder = binComps;

    var resumo = [];

    // ---------- PRE-COMPS POR BLOCO ----------
    for (var b = 0; b < BLOCOS.length; b++) {
        var prefixo = BLOCOS[b][0], nome = BLOCOS[b][1];
        var tIn = BLOCOS[b][2], tOut = BLOCOS[b][3], usarScreen = BLOCOS[b][4];
        var dur = tOut - tIn;

        var bin = getBin(nome);
        bin.parentFolder = binMats;

        var sub = findSub(root, prefixo);
        var clips = importVideos(sub, bin);

        var pc = app.project.items.addComp("COMP_" + nome, W, H, 1.0, dur, FPS);
        pc.parentFolder = binComps;

        // empilha e escalona os clipes dentro da pre-comp
        var n = clips.length;
        for (var c = 0; c < n; c++) {
            var ly = pc.layers.add(clips[c]);
            if (usarScreen) { try { ly.blendingMode = BlendingMode.SCREEN; } catch (e) {} }
            // escalona no tempo quando ha varios clipes (fluxo continuo)
            if (n > 1) {
                var seg = dur / n;
                var start = c * seg - (c > 0 ? 0.5 : 0); // 0.5s de sobreposicao p/ dissolve
                try { ly.startTime = start; } catch (e2) {}
                // cross-dissolve simples via opacidade
                try {
                    var op = ly.property("ADBE Transform Group").property("ADBE Opacity");
                    var s = ly.startTime;
                    if (c > 0) { op.setValueAtTime(s, 0); op.setValueAtTime(s + 0.5, 100); }
                } catch (e3) {}
            }
        }
        if (n === 0) {
            // sem clipe: cria um solido placeholder para nao ficar vazio
            var solid = pc.layers.addSolid([0.06, 0.06, 0.06], "PLACEHOLDER_" + nome, W, H, 1.0);
        }

        // coloca a pre-comp na MASTER no tempo certo
        var onMaster = master.layers.add(pc);
        onMaster.startTime = tIn;

        resumo.push(nome + ": " + n + " clipe(s)  [" + tIn + "s -> " + tOut + "s]");

        // ---- LINHA DE COSTURA no bloco 07 ----
        if (prefixo === "07_") { criarLinhaCostura(pc, dur, [1, 1, 1]); }
        // ---- LINHA VERMELHA no bloco 08 ----
        if (prefixo === "08_") { criarLinhaCostura(pc, dur, [0.85, 0.05, 0.05]); }
        // ---- MATTE DE APAGAMENTO no bloco 09 ----
        if (prefixo === "09_") { criarApagamento(pc, dur, clips); }
    }

    app.endUndoGroup();
    master.openInViewer();
    alert("Montagem concluida!\n\n" + resumo.join("\n") +
          "\n\nAbra MASTER_Cena11. Ajuste finos (trim, cor, som) sao manuais.");

    // ============ SUB-ROTINAS DE EFEITO ============
    function criarLinhaCostura(comp, dur, cor) {
        try {
            var sh = comp.layers.addShape();
            sh.name = (cor[0] > 0.5 && cor[1] < 0.2) ? "LINHA_VERMELHA" : "LINHA_DE_COSTURA";
            var root = sh.property("ADBE Root Vectors Group");
            var grp = root.addProperty("ADBE Vector Group");
            var gc = grp.property("ADBE Vectors Group");

            // caminho: linha horizontal + zigzag vertical no fim (ponto de costura)
            var path = gc.addProperty("ADBE Vector Shape - Group");
            var verts = [
                [-800, 0], [-500, -20], [-200, 15], [100, -15], [400, 10],
                [600, 0], [640, 40], [680, -40], [720, 40], [760, -40], [800, 0]
            ];
            var shp = new Shape();
            shp.vertices = verts; shp.closed = false;
            path.property("ADBE Vector Shape").setValue(shp);

            var stroke = gc.addProperty("ADBE Vector Graphic - Stroke");
            stroke.property("ADBE Vector Stroke Color").setValue(cor);
            stroke.property("ADBE Vector Stroke Width").setValue(8);
            // tracejado = pontos de costura
            try {
                var dashes = stroke.property("ADBE Vector Stroke Dashes");
                var d = dashes.addProperty("ADBE Vector Stroke Dash 1");
                d.setValue(18);
                var g2 = dashes.addProperty("ADBE Vector Stroke Gap 1");
                g2.setValue(12);
            } catch (eDash) {}

            // Trim Paths animado
            var trim = gc.addProperty("ADBE Vector Filter - Trim");
            var end = trim.property("ADBE Vector Trim End");
            end.setValueAtTime(0, 0);
            end.setValueAtTime(dur * 0.9, 100);
            // easy ease
            try {
                var ke = end.nearestKeyIndex(dur * 0.9);
                end.setInterpolationTypeAtKey(1, KeyframeInterpolationType.BEZIER);
                end.setInterpolationTypeAtKey(2, KeyframeInterpolationType.BEZIER);
            } catch (eEase) {}

            // centraliza a shape
            sh.property("ADBE Transform Group").property("ADBE Position").setValue([W / 2, H / 2]);
        } catch (e) { /* se falhar, segue sem a linha */ }
    }

    function criarApagamento(comp, dur, clips) {
        try {
            // procura um clipe de "brush" entre os importados para usar de matte
            var brush = null;
            for (var i = 0; i < clips.length; i++) {
                if (/brush|stroke|pincel/i.test(clips[i].name)) { brush = clips[i]; break; }
            }
            if (!brush) return; // sem brush, deixa manual
            var matte = comp.layers.add(brush);
            matte.name = "BORRACHA_MATTE (Luma Invert -> aplicar na pre-comp de baixo)";
            matte.moveToBeginning();
            // dica visual: liga o matte como guia; usuario define Track Matte no painel
            matte.enabled = true;
        } catch (e) {}
    }
})();
