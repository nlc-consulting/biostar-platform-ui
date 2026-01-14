import React, { useEffect, useState } from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Link as RouterLink } from 'react-router';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, IconButton } from '@mui/material';
import { API_BASE_URL, authFetch } from '../../apiClient.ts';

interface Group {
  id: number;
  name: string;
  parentId?: number | null;
  children?: Group[];
}

interface GroupTreeProps {
  groupId: number;
}

const GroupTree: React.FC<GroupTreeProps> = ({ groupId }) => {
  const [groupTree, setGroupTree] = useState<Group | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);

  const getAllNodeIds = (node: Group): string[] => {
    const ids = [String(node.id)];
    if (node.children) {
      node.children.forEach((child) => ids.push(...getAllNodeIds(child)));
    }

    return ids;
  };

  useEffect(() => {
    authFetch(`${API_BASE_URL}/groups/tree/${groupId}`)
      .then((res) => res.json())
      .then((data) => {
        setGroupTree(data);
        setExpanded(getAllNodeIds(data));
      })
      .catch((err) => console.error('Failed to load group tree', err));
  }, [groupId]);

  const renderTree = (node: Group) => (
    <TreeItem
      key={node.id}
      itemId={String(node.id)}
      label={
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <span>{node.name}</span>
          <IconButton
            size="small"
            edge="end"
            sx={{ p: 0.5 }}
            component={RouterLink}
            to={`/groups/${node.id}`}
            onClick={(e) => e.stopPropagation()} // ✅ prevent expand/collapse
          >
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </Box>
      }
    >
      {node.children?.map((child) => renderTree(child))}
    </TreeItem>
  );

  if (!groupTree) return <p>Loading tree...</p>;

  return (
    <SimpleTreeView
      selectedItems={`${groupId}`}
      expandedItems={expanded}
      onExpandedItemsChange={(_, itemIds) => setExpanded(itemIds)}
      // onSelectedItemsChange={(_, itemIds) => setSelected(itemIds?.[0] ?? '')}
    >
      {renderTree(groupTree)}
    </SimpleTreeView>
  );
};

export default GroupTree;
