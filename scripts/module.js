
import { libWrapper } from './shim.js';

Hooks.once('init', async function() {
    libWrapper.register("hidden-tables", "RollTable.prototype.draw", updateMode, "WRAPPER")

});

Hooks.on("renderRollTableConfig", (config, html, css) => {
    const isHidden = config.object.getFlag("hidden-tables", "hidden")
    let lastBox = html.find(".results")
    let checkboxHTML = `
    <div class="form-group">
        <label>${game.i18n.format("hidden-tables.tableText")}</label>
        <input type="checkbox" name="flags.hidden-tables.hidden" ${isHidden ? "checked" : ""}>
    </div>
    `
    lastBox.before(checkboxHTML)
})


function updateMode(wrapped, ...args) {
    
    if(this.getFlag("hidden-tables", "hidden")) {
        try {
            args[0].rollMode = "gmroll";
        }
        catch {
            args.push({rollMode : "gmroll"})
        }
    }
    return wrapped( ...args)
}