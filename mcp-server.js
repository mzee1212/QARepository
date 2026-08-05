const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { z } = require('zod/v4');
const fs = require('fs');
const path = require('path');

const server = new McpServer({
  name: 'pwautomation-mcp-server',
  version: '1.0.0'
});

server.registerTool('list_workspace_files', {
  description: 'List files in the current workspace directory, optionally scoped to a subfolder.',
  inputSchema: {
    folder: z.string().optional().describe('Relative folder under the workspace root to inspect.')
  }
}, async ({ folder }) => {
  const workspaceRoot = process.cwd();
  const targetFolder = folder ? path.resolve(workspaceRoot, folder) : workspaceRoot;

  if (!fs.existsSync(targetFolder)) {
    return {
      content: [
        {
          type: 'text',
          text: `Folder not found: ${targetFolder}`
        }
      ]
    };
  }

  const entries = fs.readdirSync(targetFolder, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((entry) => `${entry.isDirectory() ? 'dir' : 'file'}: ${entry.name}`)
    .join('\n');

  return {
    content: [
      {
        type: 'text',
        text: `Workspace scan for ${targetFolder}\n${entries || 'No entries found.'}`
      }
    ]
  };
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('MCP server is running...');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
