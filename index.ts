import "@logseq/libs";
async function add_para_properties(property: string) {
  const page = await logseq.Editor.getCurrentPage() as PageEntity;
  const blocks = await logseq.Editor.getCurrentPageBlocksTree();
  const first_block = blocks[0];

  if (page.properties) {
    await logseq.Editor.upsertBlockProperty(first_block.uuid, property, "");
  } else {
    var properties_obj = {};
    properties_obj[property] = "";
    await logseq.Editor.insertBlock(first_block.uuid, "", { sibling: true, before: true, properties: properties_obj });
  }
}

logseq
.ready(() => {
  logseq.Editor.registerSlashCommand("Project [file page under a project]", async (e) => {
    add_para_properties("project");
  });
  logseq.Editor.registerSlashCommand("Area [file page under an area]", async (e) => {
    add_para_properties("area");
  });
  logseq.Editor.registerSlashCommand("Resource [file page under a resource]", async (e) => {
    add_para_properties("resource");
  });
})
.catch(console.error);
