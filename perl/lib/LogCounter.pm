package LogCounter;
use strict;
use warnings;

use Data::Dumper;

sub new {
    my ($class, $logs) = @_;
    return bless { logs => $logs }, $class;
};

sub group_by_user {
  my $self = shift;
  my %return;
  for my $log (@{$self->{logs}}) {
    if ($log->{user}) {
      push @{$return{$log->{user}}}, $log;
    } else {
      push @{$return{'guest'}}, $log;
    }
  }

  \%return;
}

sub count_error {
  my $self = shift;
  my $count = 0;
  for my $log (@{$self->{logs}}) {
    if ($log->{status} =~ /^[5]\d{2}$/) {
      $count++;
    }
  };

  return $count;
}

1;
