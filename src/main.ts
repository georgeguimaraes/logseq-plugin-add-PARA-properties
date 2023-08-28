import "@logseq/libs";
import { PageEntity } from "@logseq/libs/dist/LSPlugin.user";

async function add_para_properties(property: string) {
  const page = (await logseq.Editor.getCurrentPage()) as PageEntity;
  const blocks = await logseq.Editor.getCurrentPageBlocksTree();
  const first_block = blocks[0];

  if (page.properties) {
    await logseq.Editor.upsertBlockProperty(first_block.uuid, property, "");
  } else {
    const properties_obj: { [key: string]: any } = {};
    properties_obj[property] = "";
    await logseq.Editor.insertBlock(first_block.uuid, "", {
      sibling: true,
      before: true,
      properties: properties_obj,
    });
  }
}

logseq
  .ready(() => {
    logseq.Editor.registerSlashCommand(
      "Project [file page under a project]",
      async (_) => {
        add_para_properties("project");
      }
    );
    logseq.Editor.registerSlashCommand(
      "Area [file page under an area]",
      async (_) => {
        add_para_properties("area");
      }
    );
    logseq.Editor.registerSlashCommand(
      "Resource [file page under a resource]",
      async (_) => {
        add_para_properties("resource");
      }
    );
  })
  .catch(console.error);
