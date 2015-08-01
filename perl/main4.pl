use strict;
use warnings;

use DateTime;
use Data::Dumper;

use Parser;

my $parser = Parser->new(filename => '../sample_data/large_log.ltsv');
my $parsed_logs = $parser->parse;
my $i;

my %result;

print "毎分のリクエスト URI の分布\n";

for my $log (@{$parsed_logs}) {
  my $formatted_time = substr($log->time, 0, 16);
  $result{$formatted_time}->{$log->uri}++;
}

for my $key (sort keys %result) {
  print "\n$key  ";

  for ($i = 1; $i <= 40; $i++) {
    if ($i == 1 || $i % 5 == 0) {
      print $i;
    } else {
      print " ";
    }
  }

  print "\n";

  for (sort keys %{$result{$key}}) {
    # ドメインが 127.0.0.1 の場合
    my $path = substr($_, 16);
    printf("%16s: ", $path);
    for ($i = 0; $i < $result{$key}->{$_}; $i++) {
      print "=";
    }
    print "\n";
  }
}
