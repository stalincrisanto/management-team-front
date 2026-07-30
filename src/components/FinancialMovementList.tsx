import React, { Fragment } from 'react';
import { formatMoney } from '@/modules/season/utils/season.mapper';
import { Alert, Box, Divider, List, ListItem, Stack, Typography } from '@mui/material';

export type FinancialMovementTone = 'success' | 'error';

export interface FinancialMovementItem {
  id: string;
  title: string;
  category: string;
  amount: number;
  description?: string | null;
}

interface FinancialMovementListProps {
  items: FinancialMovementItem[];
  total: number;
  tone: FinancialMovementTone;

  singularLabel: string;
  pluralLabel: string;
  emptyMessage: string;
}

const FinancialMovementList = ({
  items,
  total,
  tone,
  singularLabel,
  pluralLabel,
  emptyMessage,
}: FinancialMovementListProps) => {
  const amountColor = tone === 'success' ? 'success.main' : 'error.main';

  if (items.length === 0) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        {emptyMessage}
      </Alert>
    );
  }

  const movementLabel = items.length === 1 ? singularLabel : pluralLabel;

  return (
    <Stack>
      <List disablePadding>
        {items.map((item, index) => {
          const description = item.description?.trim();

          return (
            <Fragment key={item.id}>
              <ListItem
                alignItems="flex-start"
                disableGutters
                sx={{
                  px: {
                    xs: 2,
                    sm: 2.5,
                  },
                  py: {
                    xs: 1.5,
                    sm: 1.75,
                  },
                }}
              >
                <Box
                  sx={{
                    alignItems: 'flex-start',
                    display: 'flex',
                    gap: 2,
                    minWidth: 0,
                    width: '100%',
                  }}
                >
                  <Stack
                    spacing={0.25}
                    sx={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      fontWeight={600}
                      sx={{
                        overflowWrap: 'anywhere',
                      }}
                      variant="body2"
                    >
                      {item.title}
                    </Typography>

                    <Typography color="text.secondary" variant="caption">
                      {item.category}
                    </Typography>

                    {description ? (
                      <Typography
                        color="text.secondary"
                        sx={{
                          overflowWrap: 'anywhere',
                        }}
                        variant="caption"
                      >
                        {description}
                      </Typography>
                    ) : null}
                  </Stack>

                  <Typography
                    color={amountColor}
                    sx={{
                      flexShrink: 0,
                      fontWeight: 700,
                      lineHeight: 1.5,
                    }}
                    variant="body2"
                  >
                    {formatMoney(Number(item.amount))}
                  </Typography>
                </Box>
              </ListItem>

              {index < items.length - 1 ? <Divider component="li" /> : null}
            </Fragment>
          );
        })}
      </List>

      <Divider />

      <Stack
        alignItems={{
          xs: 'flex-start',
          sm: 'center',
        }}
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        justifyContent="space-between"
        spacing={1}
        sx={{
          bgcolor: 'background.default',
          px: {
            xs: 2,
            sm: 2.5,
          },
          py: 1.75,
        }}
      >
        <Typography color="text.secondary" variant="body2">
          {items.length} {movementLabel}
        </Typography>

        <Stack alignItems="baseline" direction="row" spacing={1}>
          <Typography color="text.secondary" variant="body2">
            Total:
          </Typography>

          <Typography color={amountColor} fontWeight={700} variant="body1">
            {formatMoney(Number(total))}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FinancialMovementList;
